$(document).ready(function() {
  // 약관 전체 보기
  $('[class*="textbico_mide_down"]').closest('a').on('click', function(e) {
      $(this).toggleClass('active');
      activeBtnAco($(this).hasClass('active'));
  });
  
  $('.box_chk01').each(function() {
      var _this = $(this), txt = _this.find('label').text();
      _this.find('.btn_pop_arrow').attr('title', txt + ' 팝업 열기');
      _this.find('.blind').text(txt + ' 팝업 열기');
  });
  
  activeAgree();
});
function activeAgree(terms) {
  var _terms = $('.terms');
  if (terms) {
      _terms = $(terms);
  }
  _terms.find('.not_chk .box_chk02 :checkbox').prop('disabled', true);
  _terms.each(function(i, o) {
      $(o).find(':checkbox').on('change subChange', function(e) {
          if ($('.container').hasClass('at_card')) {
              return true;
          }

          var _target = this;
          // terms 구간 전체 체크
          if ($(_target).closest('.check_wrap').size()) {
              if (e.type === 'change') {
                  $(o).find(':checkbox').not(_target).prop('checked', $(_target).is(':checked')).get().forEach(function(con) {
                      if ($(con).closest('.not_chk').size() && $(con).closest('.box_chk02').size()) {
                          $(con).prop('disabled', !$(_target).is(':checked'));
                      }
                      jqueryValidate(con);
                  });
              }
          } else if ($(_target).closest('.box_chk').size()) {// box_chk
              if (e.type === 'change') {
                  $(_target).closest('.agree_wrap').find(':checkbox').not(_target).prop('checked', $(_target).is(':checked')).get().forEach(function(con) {
                      if ($(con).closest('.not_chk').size() && $(con).closest('.box_chk02').size()) {
                          $(con).prop('disabled', !$(_target).is(':checked'));
                      }
                      jqueryValidate(con);
                  });
              }
              var _boxChkChecked = $(_target).closest('.check_terms').find('.agree_wrap :checkbox').map(function(idx, obj) {
                  return obj.checked;
              }).get().includes(false);
              $(_target).closest('.terms').find('.check_wrap :checkbox').prop('checked', !_boxChkChecked);
          } else if ($(_target).closest('.box_chk01').size()) {// box_chk01
              if (e.type === 'change') {
                  $(_target).closest('.items').find(':checkbox').not(_target).prop('checked', $(_target).is(':checked')).get().forEach(function(con) {
                      if ($(con).closest('.not_chk').size() && $(con).closest('.box_chk02').size()) {
                          $(con).prop({
                              'checked' : false,
                              'disabled' : !$(_target).is(':checked')
                          });
                      }
                      jqueryValidate(con);
                  });
              }

              if ($(_target).closest('.except').size()) {
                  if ($(_target).closest('.except_items').size()) {
                      $(_target).closest('.except').find(':checkbox').not(_target).prop('checked', $(_target).is(':checked')).get().forEach(function(con){
                          jqueryValidate(con);
                      });
                  } else {
                      $(_target).closest('.except').find('.except_items :checkbox').not(_target).prop('checked', $(_target).is(':checked')).get().forEach(function(con){
                          jqueryValidate(con);
                      });
                  }
              }

              var _boxChk01Checked = $(_target).closest('.aco_wrap').find(':checkbox').map(function(idx, obj) {
                  return obj.checked;
              }).get().includes(false);
              $(_target).closest('.agree_wrap').find('.box_chk :checkbox').prop('checked', !_boxChk01Checked).trigger('subChange');
          } else if ($(_target).closest('.box_chk02').size()) {// box_chk02
              if (e.type === 'change') {
                  var _subCheckGroup = $(_target).closest('li').find(':checkbox');
                  if (_subCheckGroup.size() > 1) {
                      if (_subCheckGroup.index($(_target)) === 0) {
                          _subCheckGroup.not($(_target)).prop('checked', $(_target).is(':checked'));
                      } else {
                          _subCheckGroup.filter(':first').prop('checked', !_subCheckGroup.not(':first').map(function(idx, obj) {
                              return obj.checked;
                          }).get().includes(false));
                      }
                  }
                  jqueryValidate(_subCheckGroup);
              }
              var _boxChk02Checked = $(_target).closest('.chk_list').find(':checkbox').map(function(idx, obj) {
                  return obj.checked;
              }).get().includes(false);
              if ($(_target).closest('.not_chk').size()) {
                  $(_target).closest('.items').find('.box_chk01 :checkbox').trigger('subChange');
              } else {
                  $(_target).closest('.items').find('.box_chk01 :checkbox').prop('checked', !_boxChk02Checked).trigger('subChange');
              }
          }
          jqueryValidate(_target);
      });
  });
}

function activeBtnAco(isAco, terms) {
  var _btnAco = terms ? $(terms) : $('.terms .btn_aco');
  if (isAco) {
      _btnAco.each(function(i, o) {
          if (!$(o).hasClass('on')) {
              $(o).addClass('on');
              $(o).closest('.agree_wrap').find('.aco_wrap').css('display', 'block');
          }
      });
  } else {
      _btnAco.each(function(i, o) {
          if ($(o).hasClass('on')) {
              $(o).removeClass('on');
              $(o).closest('.agree_wrap').find('.aco_wrap').css('display', 'none');
          }
      });
  }
}

function jqueryValidate(obj) {
  var isJqueryValidate = false;
  if ($('#btnNext').size()) {
      if ($._data($('#btnNext')[0]).hasOwnProperty('events')) {
          var events = $._data($('#btnNext')[0]).events;
          $.each(events, function() {
              isJqueryValidate = this.map(function(o, i, a) {
                  return o.namespace;
              }).includes('jqueryValidate');
          });
      }
  }
  $(obj).each(function(i, o) {
      if (typeof $(o).attr('valid') != undefined) {
          if (isJqueryValidate) {
              $(o).trigger('change.jqueryValidate');
          } else {
              $(o).trigger('change.validate');
          }
      }
  });
}

function fncheck(cls) {
  var essLen = $('.' + cls).filter('[data-check-value]');
  for (var i = 0; i < essLen.length; i++) {
      var val = essLen.eq(i).find('input').prop('checked');

      if (val === false) {
          essLen.eq(i).addClass('error')
          if (!essLen.eq(i).addClass('error').find('.btn_aco').hasClass('on')) {
              essLen.eq(i).addClass('error').find('.btn_aco').trigger('click');
          }
          $('.error_txt').show();
      }
  }
}
/*
function getYearPay() {
  var rtnStr = '';
  // $('#layer_annual_pop li.main-txt').each(function() {
  $('#popMemberFee li.main-txt').each(function() {
      if ($(this).text().indexOf('국내전용') >= 0) {
          var tmp = $(this).text().split('국내전용 ');
          var tmpBrand = '국내전용';
          var tmpPay = '본인 ' + tmp[1];
          rtnStr += '<li><span>' + tmpBrand + '</span>';
          rtnStr += '<p>' + tmpPay + '</p></li>';
      } else if ($(this).text().indexOf('국내외겸용') >= 0) {
          var tmp = $(this).text().split(') ');
          var tmpPay = '본인 ' + tmp[1];
          if (tmp[0].indexOf('VISA / MasterCard') >= 0) {
              var tmpBrand = 'VISA / MasterCard';
          } else {
              var tmpBrand = tmp[0].split(' ')[0].replace('국내외겸용(', '');
          }
          rtnStr += '<li><span>' + tmpBrand + '</span>';
          rtnStr += '<p>' + tmpPay + '</p></li>';
      } else if ($(this).text().indexOf('유류세 환급 대상') >= 0) { // 2021-09-02 GGU477 유류세 환급 대상 추가
          var tmp = $(this).text().split('유류세 환급 대상 ');
          var tmpBrand = '유류세 환급 대상';
          var tmpPay = '연회비 없음';
          rtnStr += '<li><span>' + tmpBrand + '</span>';
          rtnStr += '<p>' + tmpPay + '</p></li>';
      }
  })

  if (rtnStr != '') {
      return rtnStr;
  }
}
*/
/*말풍선 추가*/
var addProg = function(txt, time) {
  $('header').addClass('type1');
  $('.bar_container .navi').text(txt);
  setTimeout(function() {
      $('header').removeClass('type1');
      $('.bar_container .navi').text('');
  }, time);
}
$(window).load(function(){//cms 동작 문제로 winodw.load 로 변경
  $(document).on('click', '.btn_aco' , function() {// 약관 슬라이드 토글
      $(this).toggleClass('on').parents('.agree_wrap').find('.aco_wrap').slideToggle(100);

      if ($(this).parents('.agree_wrap').hasClass('type1')) {
          $(this).parents('.agree_wrap').find('.chk_con').children('.fc_a48').toggleClass('dp');
      }
      if ($(this).parents('.agree_wrap').hasClass('type2')) {
          $(this).parents('.agree_wrap').find('.chk_con').toggleClass('dn');
      }
      
      if ($(this).parents('.agree_wrap').hasClass('type3')) {// Q10582: 22.01.20 화면코드 MOCAR087800 예외로 타입 추가
          $(this).parents('.agree_wrap').find('.chk_con').children('.fc_a48').next().toggleClass('dp');
      }
  });
  $(document).on('click' , '.accod_btn' , function(){
      $(this).closest('.accod_btn').toggleClass('on');
      $(this).closest('.accod_wrap').find('.accod_con').slideToggle(100);
  });
});
