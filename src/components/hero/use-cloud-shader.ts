'use client'

import { useCallback, useEffect, useRef } from 'react'
import { fragmentShaderSource, vertexShaderSource } from './cloud-shader'

interface ShaderState {
	gl: WebGL2RenderingContext
	program: WebGLProgram
	timeLocation: WebGLUniformLocation
	resolutionLocation: WebGLUniformLocation
}

function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
	const shader = gl.createShader(type)
	if (!shader) return null

	gl.shaderSource(shader, source)
	gl.compileShader(shader)

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error('Shader compile error:', gl.getShaderInfoLog(shader))
		gl.deleteShader(shader)
		return null
	}

	return shader
}

function createProgram(
	gl: WebGL2RenderingContext,
	vertexShader: WebGLShader,
	fragmentShader: WebGLShader
): WebGLProgram | null {
	const program = gl.createProgram()
	if (!program) return null

	gl.attachShader(program, vertexShader)
	gl.attachShader(program, fragmentShader)
	gl.linkProgram(program)

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('Program link error:', gl.getProgramInfoLog(program))
		gl.deleteProgram(program)
		return null
	}

	return program
}

function initWebGL(canvas: HTMLCanvasElement): ShaderState | null {
	const gl = canvas.getContext('webgl2')
	if (!gl) {
		console.error('WebGL2 not supported')
		return null
	}

	// Create shaders
	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

	if (!vertexShader || !fragmentShader) {
		return null
	}

	// Create program
	const program = createProgram(gl, vertexShader, fragmentShader)
	if (!program) {
		return null
	}

	// Create fullscreen quad
	const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])

	const positionBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

	const positionLocation = gl.getAttribLocation(program, 'a_position')
	gl.enableVertexAttribArray(positionLocation)
	gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

	// Get uniform locations
	const timeLocation = gl.getUniformLocation(program, 'u_time')
	const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')

	if (!timeLocation || !resolutionLocation) {
		console.error('Could not get uniform locations')
		return null
	}

	// biome-ignore lint/correctness/useHookAtTopLevel: gl.useProgram is a WebGL method, not a React hook
	gl.useProgram(program)

	return { gl, program, timeLocation, resolutionLocation }
}

export function useCloudShader(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
	const shaderStateRef = useRef<ShaderState | null>(null)
	const animationFrameRef = useRef<number | null>(null)
	const startTimeRef = useRef<number>(0)

	const resize = useCallback(() => {
		const canvas = canvasRef.current
		const state = shaderStateRef.current
		if (!canvas || !state) return

		const dpr = window.devicePixelRatio || 1
		const width = canvas.clientWidth * dpr
		const height = canvas.clientHeight * dpr

		if (canvas.width !== width || canvas.height !== height) {
			canvas.width = width
			canvas.height = height
			state.gl.viewport(0, 0, width, height)
		}
	}, [canvasRef])

	const render = useCallback(
		(time: number) => {
			const canvas = canvasRef.current
			const state = shaderStateRef.current
			if (!canvas || !state) return

			resize()

			const elapsedTime = (time - startTimeRef.current) / 1000

			state.gl.uniform1f(state.timeLocation, elapsedTime)
			state.gl.uniform2f(state.resolutionLocation, canvas.width, canvas.height)
			state.gl.drawArrays(state.gl.TRIANGLES, 0, 6)

			animationFrameRef.current = requestAnimationFrame(render)
		},
		[canvasRef, resize]
	)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		// Initialize WebGL
		shaderStateRef.current = initWebGL(canvas)
		if (!shaderStateRef.current) return

		// Start animation
		startTimeRef.current = performance.now()
		animationFrameRef.current = requestAnimationFrame(render)

		// Handle resize
		window.addEventListener('resize', resize)

		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
			window.removeEventListener('resize', resize)
		}
	}, [canvasRef, render, resize])
}
