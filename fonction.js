function changementtaillefenetre() {
    let imageBackground = document.getElementById("imageAccueil");
    let premiereImage = document.getElementById("premiereImageCarroussel");
    let deuxiemeImage = document.getElementById("deuxiemeImageCarroussel");
    let troisiemeImage = document.getElementById("troisiemeImageCarroussel");
    let quatriemeImage = document.getElementById("quatriemeImageCarroussel");
    let cinquiemeImage = document.getElementById("cinquiemeImageCarroussel");
    let sixiemeImage = document.getElementById("sixiemeImageCarroussel");
    let septiemeImage = document.getElementById("septiemeImageCarroussel");

    let premiereImageActivite = document.getElementById("premiereImageCarrousselActivite");
    let deuxiemeImageActivite = document.getElementById("deuxiemeImageCarrousselActivite");
    let troisiemeImageActivite = document.getElementById("troisiemeImageCarrousselActivite");
    let quatriemeImageActivite = document.getElementById("quatriemeImageCarrousselActivite");
    let cinquiemeImageActivite = document.getElementById("cinquiemeImageCarrousselActivite");
    let sixiemeImageActivite = document.getElementById("sixiemeImageCarrousselActivite");
    let septiemeImageActivite = document.getElementById("septiemeImageCarrousselActivite");
    let huitiemeImageActivite = document.getElementById("huitiemeImageCarrousselActivite");
    let neuviemeImageActivite = document.getElementById("neuviemeImageCarrousselActivite");
    let dixiemeImageActivite = document.getElementById("dixiemeImageCarrousselActivite");


    if (document.body.clientWidth >= 680) {
        imageBackground.src = 'images/BackgroundDesktop.jpg';

        premiereImage.src = 'images/presentationKylianDesktop.jpg';
        deuxiemeImage.src = 'images/presentationMaevaDesktop.jpg';
        troisiemeImage.src = 'images/presentationOrlaneDesktop.jpg';
        quatriemeImage.src = 'images/presentationAndyDesktop.jpg';
        cinquiemeImage.src = 'images/presentationFredericDesktop.jpg';
        sixiemeImage.src = 'images/presentationChatsDesktop.jpg';
        septiemeImage.src = 'images/presentationChienDesktop.jpg';

        premiereImageActivite.src = 'images/deguisementsDesktop.jpg';
        deuxiemeImageActivite.src = 'images/baladeDesktop.jpg';
        troisiemeImageActivite.src = 'images/piscineDesktop.jpg';
        quatriemeImageActivite.src = 'images/peinturePropreDesktop.jpg';
        cinquiemeImageActivite.src = 'images/fetesDesMeresDesktop.jpg';
        sixiemeImageActivite.src = 'images/jeuDehorsDesktop.jpg';
        septiemeImageActivite.src = 'images/relaiAssmatDesktop.jpg';
        huitiemeImageActivite.src = 'images/tapisEveilDesktop.jpg';
        neuviemeImageActivite.src = 'images/siege360Desktop.jpg';
        dixiemeImageActivite.src = 'images/etcDesktop.jpg';


    } else if (document.body.clientWidth < 680) {
        imageBackground.src = 'images/BackgroundPhone.jpg';

        premiereImage.src = 'images/presentationKylian.jpg';
        deuxiemeImage.src = 'images/presentationMaeva.jpg';
        troisiemeImage.src = 'images/presentationOrlane.jpg';
        quatriemeImage.src = 'images/presentationAndy.jpg';
        cinquiemeImage.src = 'images/presentationFrederic.jpg';
        sixiemeImage.src = 'images/presentationChats.jpg';
        septiemeImage.src = 'images/presentationChien.jpg';

        premiereImageActivite.src = 'images/deguisements.jpg';
        deuxiemeImageActivite.src = 'images/balade.jpg';
        troisiemeImageActivite.src = 'images/piscine.jpg';
        quatriemeImageActivite.src = 'images/peinturePropre.jpg';
        cinquiemeImageActivite.src = 'images/fetesDesMeres.jpg';
        sixiemeImageActivite.src = 'images/jeuDehors.jpg';
        septiemeImageActivite.src = 'images/relaiAssmat.jpg';
        huitiemeImageActivite.src = 'images/tapisEveil.jpg';
        neuviemeImageActivite.src = 'images/siege360.jpg';
        dixiemeImageActivite.src = 'images/etc.jpg';
    }
}

