$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    infinite: true,
                }
            }
        ]
        });

        $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
            $(this)
                .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
                .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
        });

        // $('.catalog-item__link').each(function(i) {
        //     $(this).on('click', function(e) {
        //         e.preventDefault();
        //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        //     });
        // });

        // $('.catalog-item__back').each(function(i) {
        //     $(this).on('click', function(e) {
        //         e.preventDefault();
        //         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        //         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        //     });
        // });

        function toggleSlide(item) {
            $(item).each(function(i) {
                $(this).on('click', function(e) {
                    e.preventDefault();
                    $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                    $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
                });
            });
        }
        toggleSlide('.catalog-item__link');
        toggleSlide('.catalog-item__back');



    
    //modal:
    $('[data-modal="consultation"]').on('click', function() {//получить элемент со страницы с помощью атрибута "consultation
        $('.overlay, #consultation').fadeIn();//по клику срабатывает функция fadeIn(парам времени) к элементам оверлай и консульт
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut();//аналог , но для закрытия модального окна
    });
    // $('.button_mini').on('click', function() {//аналог первого, но для заказа товара
    //     $('.overlay, #order').fadeIn();
    // });
    $('.button_mini').each(function(i){//замена текста(названия) в модальном окне в соответствии с выбранным товаром
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });





    //validation Написана функция, которая выполняется для трёх форм внизу
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Введите минимум {0} символа!")
                },
                phone: "Пожалуйста, введите номер телефона",
                email: {
                    required: "Введите почтый адрес для связи",
                    email: "Адрес электронной почты должен соответствовать шаблону name@domain.com"
                }
              }
        });
    }
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');




    //mask phone
    $('input[name=phone]').mask("+375(99)999-99-99");




    //mailer
    $('form').submit(function(e){
        e.preventDefault();// отключить станд поведение браузера-не перезагружать страницу 
        $.ajax({
            type: "POST",
            url: "mailer/smart.php", //куда будем отправлять запрос
            data: $(this).serialize() //те данные, которые мы отправляем на сервер
        }).done(function(){//после выполнения отправки запроса надо выполнить действия:
            $(this).find("input").val("");//найти все инпуты и установить пустые значения
            $('#consultation, #order').fadeOut();//скрыть модалки даже если оне не были открыты
            $('.overlay, #thanks').fadeIn('slow');//показать модалку СПАСИБО


            $('form').trigger('reset');//все мои формы дожны обновиться-очиститься
        });
        return false;
    });




    //smooth scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^=#up]").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(_href).offset().top+"px"});
            return false;
    });

    //подключение wow аниммации
    new WOW().init();

});


 