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
});


 