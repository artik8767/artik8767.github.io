function filterByTop(top) {
    return function (i) {
        return $(this).offset().top == top;
    };
}

function setLastProductPreviews() {
    var lastClass = 'last';
    $('.product-preview-item').removeClass(lastClass);
    $('.pmb-row').each(function (rowIndex) {
        var $pmbRow = $(this);
        var $pmbCol = $pmbRow.find('.pmb-col');
        var $psbCol = $pmbRow.find('.psb-col');
        if ($pmbCol.length > 0) {
            var pmbRowSize = $pmbCol.filter(filterByTop($pmbCol.eq(0).offset().top)).length;
        }
        if ($psbCol.length > 0) {
            var psbRowSize = $psbCol.filter(filterByTop($psbCol.eq(0).offset().top)).length;
        }
        if ($pmbCol) {
            $pmbCol.each(function (colIndex) {
                var $currentPmbCol = $(this);
                if (((colIndex + 1) % pmbRowSize) == 0) {
                    $currentPmbCol.find('.product-preview-item').addClass(lastClass);
                }
            });
        }
        if ($psbCol) {
            $psbCol.each(function (colIndex) {
                var $currentPsbCol = $(this);
                if (((colIndex + 1) % psbRowSize) == 0) {
                    $currentPsbCol.find('.product-preview-item').addClass(lastClass);
                }
            });
        }
    });
}

(function ($) {
    $.fn.imagesLoaded = function (options) {
        var images = this.find("img"), loadedImages = [], options = options;
        images.each(function (i, image) {
            function loaded() {
                loadedImages.push(this);
                if (options.imageLoaded) {
                    options.imageLoaded(this);
                }
                if (loadedImages.length == images.length) {
                    if (options.complete) {
                        options.complete(loadedImages);
                    }
                }
            }

            if (image.complete) {
                loaded.call(image);
            } else {
                $(image).load(loaded);
            }
        });
    }
})(jQuery);
$.fn.equalizeHeights = function () {
    var maxHeight = this.map(function (i, e) {
        return $(e).height();
    }).get();
    return this.height(Math.max.apply(this, maxHeight));
};
var generateSlimScroll = function (element) {
    var dataHeight = $(element).attr('data-height');
    dataHeight = (!dataHeight) ? $(element).height() : dataHeight;
    $(element).mCustomScrollbar({
        setHeight: dataHeight,
        theme: "dark-3",
        scrollInertia: 100,
        callbacks: {
            onScrollStart: function () {
                $(this).removeClass('mCS_reach_end');
            }, onTotalScroll: function () {
                $(this).addClass('mCS_reach_end');
            }
        }
    });
};

function setSameHeight() {
    if ($(window).width() > 767) {
        $('.set-height').each(function (i, elem) {
            $(this).find('.image-height').css('height', 'auto');
            $(this).find('.title-height').css('height', 'auto');
            $(this).find('.text-height').css('height', 'auto');
        });
        $('.set-height').each(function (i, elem) {
            $(this).find('.image-height').equalizeHeights();
            $(this).find('.title-height').equalizeHeights();
            $(this).find('.text-height').equalizeHeights();
        });
    }
}

$(document).ready(function () {
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        $('body').addClass('isIOS');
        $('.visible-small iframe').css({'position': 'absolute', 'left': '-50%'});
    }
    bWidth = $('body').width();
    $(window).load(function () {
    });
    $(window).scroll(function () {
    });
    $(window).resize(function () {
    });
    $(function ($) {
        $.localScroll({duration: 1000, hash: false});
    });
    $('[data-scrollbar=true]').each(function () {
        generateSlimScroll($(this));
    });
    $('.toggle-mobile-menu').click(function (e) {
        e.preventDefault();
        if ($('body').hasClass('mobile-addresses-open')) {
            $('body').removeClass('mobile-addresses-open');
        } else if ($('body').hasClass('mobile-categories-open')) {
            $('body').removeClass('mobile-categories-open');
        } else {
            $('body').toggleClass('mobile-menu-open');
        }
    });
    $('.toggle-mobile-addresses').click(function (e) {
        e.preventDefault();
        $('body').toggleClass('mobile-addresses-open');
    });
    $('.toggle-mobile-categories').click(function (e) {
        e.preventDefault();
        $('body').toggleClass('mobile-categories-open');
    });
    $(document).click(function (event) {
        if ($(event.target).closest(".mobile-menu-block, .toggle-mobile-menu").length == 0) {
            $('body').removeClass('mobile-menu-open');
        }
        event.stopPropagation();
    });
    $(document).click(function (event) {
        if ($(event.target).closest(".mobile-addresses-block, .toggle-mobile-addresses").length == 0) {
            $('body').removeClass('mobile-addresses-open');
        }
        event.stopPropagation();
    });
    $(document).click(function (event) {
        if ($(event.target).closest(".mobile-categories-block, .toggle-mobile-categories").length == 0) {
            $('body').removeClass('mobile-categories-open');
        }
        event.stopPropagation();
    });
    setLastProductPreviews();
    $(document).on('click', '.product-preview-item', function (e) {
        e.preventDefault();
        var largeClass = 'product-preview-item-large';
        var $productPreviewItem = $(this);
        $('.' + largeClass).not($productPreviewItem).removeClass(largeClass);
        $productPreviewItem.toggleClass(largeClass);
    }).on('click', function (event) {
        if ($(event.target).closest(".product-preview-item-large, .ppi-zoom").length === 0) {
            $('.product-preview-item-large').removeClass('product-preview-item-large');
        }
        event.stopPropagation();
    });
    if ($('#main-slider').length) {
        var mainSlider = new Swiper('#main-slider', {
            pagination: '#main-slider .swiper-pagination',
            nextButton: '#main-slider .swiper-button-next',
            prevButton: '#main-slider .swiper-button-prev',
            paginationClickable: true,
            grabCursor: true
        });
    }
    if ($('#second-slider').length) {
        var secondSlider = new Swiper('#second-slider', {
            pagination: '#second-slider .swiper-pagination',
            nextButton: '#second-slider .swiper-button-next',
            prevButton: '#second-slider .swiper-button-prev',
            paginationClickable: true,
            grabCursor: true
        });
    }
    if ($('#stock-previews-slider').length) {
        var stockPreviewsSlider = new Swiper('#stock-previews-slider', {
            pagination: '#stock-previews-slider .swiper-pagination',
            paginationClickable: true,
            grabCursor: true,
            spaceBetween: 10,
            slidesPerView: 4,
            slidesPerGroup: 4,
            slidesPerColumn: 1,
            breakpoints: {
                992: {slidesPerView: 3, slidesPerGroup: 3},
                768: {slidesPerView: 2, slidesPerGroup: 2, slidesPerColumn: 2, spaceBetween: 0},
                600: {slidesPerView: 1, slidesPerGroup: 1, slidesPerColumn: 2, spaceBetween: 0}
            }
        });
    }

    if ($('#natural-products-slider').length) {
        var stockPreviewsSlider = new Swiper('#natural-products-slider', {
            pagination: '#natural-products-slider .swiper-pagination',
            paginationClickable: true,
            grabCursor: true
        });
    }
    setSameHeight();
    $('.dzi-input').on('change', function () {
        var $dziInput = $(this);
        var $dziGroup = $dziInput.parents('.dzi-group');
        var filename = $dziInput.val().split('\\').pop();
        var $dziText = $dziGroup.find('.dzi-text');
        $dziText.val(filename);
    });
    $(document).on('mouseenter', '.checkboxCustom, .radioCustom', function (e) {
        if (($(this).find('input').hasClass('disabled')) || ($(this).find('input').prop("disabled"))) {
            return 0;
        } else {
            $(this).addClass('hover');
        }
    }).on('mouseleave', '.checkboxCustom, .radioCustom', function (e) {
        if (($(this).find('input').hasClass('disabled')) || ($(this).find('input').prop("disabled"))) {
            return 0;
        } else {
            $(this).removeClass('hover');
        }
    }).on('change', 'input[type="checkbox"]', function () {
        var $checkbox = $(this);
        var $parent = $checkbox.parent('.checkboxCustom');
        if (($checkbox.find('input').hasClass('disabled')) || ($checkbox.find('input').prop("disabled"))) {
            return 0;
        }
        console.log($radio.is(":checked"));
        if ($radio.is(":checked")) {
            $parent.addClass('checked');
        } else {
            $parent.removeClass('checked');
        }
    }).on('change', 'input[type="radio"]', function () {
        var $radio = $(this);
        var $parent = $radio.parent('.radioCustom');
        var name = $radio.attr('name');
        if (($radio.find('input').hasClass('disabled')) || ($radio.find('input').prop("disabled"))) {
            return 0;
        }
        console.log($radio.is(":checked"));
        if ($radio.is(":checked")) {
            $('input[type="radio"][name="' + name + '"]').parent('.radioCustom').removeClass('checked');
            $parent.addClass('checked');
        } else {
            $parent.removeClass('checked');
        }
    });
    $('.header-nav [href=#]').on('click', function () {
        return false;
    });
});