        var i = 0;
        var images = [];
        var time = 4000;

        images[0] = 'assets/bckg_photos/abundance-1868573_1920.jpg';
        images[1] = 'assets/bckg_photos/asparagus-2169305_1920.jpg';
        images[2] = 'assets/bckg_photos/bakery-1868925_1920.jpg';
        images[3] = 'assets/bckg_photos/burger-731298_1920.jpg';
        images[4] = 'assets/bckg_photos/coffee-841425_1920.jpg';
        images[5] = 'assets/bckg_photos/cooking-2132874_1920.jpg';
        images[6] = 'assets/bckg_photos/desserts-1868181_1920.jpg';
        images[7] = 'assets/bckg_photos/fish-market-428058_1920.jpg';
        images[8] = 'assets/bckg_photos/market-3466906_1920.jpg';
        images[9] = 'assets/bckg_photos/pizza-329523_1920.jpg';
        images[10] = 'assets/bckg_photos/spaghetti-3547078_1920.jpg';
        images[11] = 'assets/bckg_photos/sushi-2853382_1920.jpg';
        images[11] = 'assets/bckg_photos/waffles-5192626_1920.jpg';


        function changeImage(){
            document.slide.src = images[i];

            if(i < images.length){
                i++;
            }
            else {
                i = 0;
            }
            setTimeout('changeImage()', time);
        }

        window.onload = changeImage;

