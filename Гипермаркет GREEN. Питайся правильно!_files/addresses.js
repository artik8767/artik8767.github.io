$(document).ready(function () {
    $.ajaxSetup({type: 'post', headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}});
    $('body').on('click', '.toggle-shops', function (e) {
        e.preventDefault();
        $('.shops-addresses-block').toggleClass('shops-addresses-block-open');
        if ($('#address-map').is(':empty')) {
            ymaps.ready(initAddressMap);
        }
    }).on('click', '.toggle-cities', function (e) {
        e.preventDefault();
        $('.cities-select-block').toggleClass('cities-select-block-open');
    }).on('click', '.sab-find-address', function (e) {
        e.preventDefault();
        var city = $('#get-city-addresses .utility-link').text();
        var address = $(this).text();
        var $addressItem = $(this).parents('.address-item');
        var $sabList = $addressItem.parents('.sab-list');
        $sabList.find('.address-item').removeClass('address-item-active');
        $addressItem.addClass('address-item-active');
        goToShopMark(address);
    }).on('click', '[data-city]', function (e) {
        e.preventDefault();
        var $city = $(this).attr('data-city');
        var $name = $('[data-city="' + $city + '"] span').text();
        $('#address-map').html('');
        $('.cities-select-block').toggleClass('cities-select-block-open');
        $.ajax({
            url: '/select-city', data: {city: $city, type: 'web'}, success: function (addresses) {
                $('.toggle-cities span').text($name);
                $('div.shops-addresses-block ul.list-unstyled').html(addresses);
            }
        });
    });
    $(document).on('click', function (event) {
        if ($(event.target).closest(".shops-addresses-block, .toggle-shops").length === 0) {
            $('.shops-addresses-block').removeClass('shops-addresses-block-open');
        }
        event.stopPropagation();
    }).on('click', function (event) {
        if ($(event.target).closest(".cities-select-block, .toggle-cities").length === 0) {
            $('.cities-select-block').removeClass('cities-select-block-open');
        }
        event.stopPropagation();
    });
    $('#city-get-addresses').on('change', function () {
        var $city = $(this).val();
        $.ajax({
            url: '/select-city', data: {city: $city, type: 'mobile'}, success: function (addresses) {
                $('ul.mobile-addresses').html(addresses);
            }
        });
    });
});
var addressMap;

function initAddressMap() {
    addressMap = new ymaps.Map('address-map', {center: [53.902220, 27.549821], controls: ['zoomControl'], zoom: 11});
    var currentCity = $('#get-city-addresses .utility-link').text();
    currentCity = 'Беларусь ' + currentCity;
    ymaps.geocode(currentCity, {results: 1}).then(function (res) {
        var newCenter = res.geoObjects.get(0).geometry.getCoordinates();
        addressMap.setCenter(newCenter);
        addShopMarks();
    });
}

function addShopMarks() {
    var shopsCollection = new ymaps.GeoObjectCollection(null, {preset: 'islands#greenDotIcon', iconColor: '#0da018'});
    $('.sab-find-address').each(function () {
        var $shopLink = $(this);
        var shopText = $shopLink.text();
        var shopCoords = $shopLink.attr('data-coordinates');
        shopCoords = JSON.parse("[" + shopCoords + "]")[0];
        var shopPlacemark = new ymaps.Placemark(shopCoords);
        shopsCollection.add(shopPlacemark);
        var shopInfo = {};
        shopInfo.coords = shopCoords;
        shopInfo.content = shopText;
        $shopLink.data('shop-info', shopInfo);
    });
    addressMap.geoObjects.add(shopsCollection);
}

function goToShopMark(address) {
    var shopInfo = $('.sab-list').find('.sab-find-address:contains("' + address + '")').data('shop-info');
    if (shopInfo) {
        addressMap.setZoom(18);
        addressMap.panTo(shopInfo.coords, {flying: false});
    }
}
