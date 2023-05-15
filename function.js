$(function() {
  var slider = $('.slider'),
    sliderUl = slider.find('.slider-parent'),
    sliderUlLi = sliderUl.find('.images-list'),
    sliderOl = slider.find('.buttom-circles'),
    sliderOlLi = sliderOl.find('.buttom-circles-list'),
    sliderFaRight = slider.find('> .fa:first-of-type'),
    sliderFaLeft = slider.find('> .fa:last-of-type'),
    sliderTime = 1000,
    sliderWait = 2000,
    sliderSetInt,
    resumeAndPause;

  sliderFaLeft.fadeOut();

  function resetWH() {
    slider.width(slider.parent().width()).height(slider.parent().width() * 0.5);
    sliderUl.width(slider.width() * sliderUlLi.length).height(slider.height());
    sliderUlLi.width(slider.width()).height(slider.height());
  }
  resetWH();

  function runSlider() {
    sliderUl.animate({
      marginLeft: -slider.width() * $('.slider-active').index()
    }, sliderTime);

    sliderFaLeft.toggle($('.slider-active').index() > 0);
    sliderFaRight.toggle($('.slider-active').index() < sliderUlLi.length - 1);
  }

  function runRight() {
    if (!$('.slider-active').next().length) {
      // last image
      sliderOlLi.last().addClass('slider-active').siblings().removeClass('slider-active');
      runSlider();
      clearInterval(resumeAndPause); // stop automatic sliding
    } else {
      $('.slider-active').removeClass('slider-active').next().addClass('slider-active');
      runSlider();
    }
  }
  
  function runLeft() {
    if (!$('.slider-active').prev().length) {
      // first image
      sliderOlLi.last().addClass('slider-active').siblings().removeClass('slider-active');
      runSlider();
      clearInterval(resumeAndPause); // stop automatic sliding
    } else {
      $('.slider-active').removeClass('slider-active').prev().addClass('slider-active');
      runSlider();
    }
  }

  sliderSetInt = function autoRunSlider() {
    runRight();
  };

  resumeAndPause = setInterval(sliderSetInt, sliderWait);

  $(window).on('resize', function() {
    resetWH();
  });

  sliderOlLi.on('click', function() {
    $(this).addClass('slider-active').siblings().removeClass('slider-active');
    runSlider();
  });

  sliderFaRight.on('click', function() {
    runRight();
  });
  sliderFaLeft.on('click', function() {
    runLeft();
  });

  slider.hover(function() {
    clearInterval(resumeAndPause);
  }, function() {
    resumeAndPause = setInterval(sliderSetInt, sliderWait);
  });
});
