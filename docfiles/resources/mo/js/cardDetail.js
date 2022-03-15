var idx;
$(document).on('click' , '.card_design_wrap ul > li > a' , function(){
    idx = $(this).parent('li').index();//클릭한 부모인자 idx
});

var detail = {
    open : function(id , btn){
        cardTitle = $('.swiper-slide').eq(idx).attr('data-card-title');
        cardCon = $('.swiper-slide').eq(idx).attr('data-card-con');
        $('.card_name_info strong').text(cardTitle);//클릭시 초기 header title 셋팅
        $('.card_name_info p').text(cardCon);//클릭시 초기 header title 셋팅
        // $('.caution_list').html(html);//유의사항을 공통으로 사용하지 않을경우 해당 부분 주석처리
        popup.open(id , btn);//popup open
        slideIndex = $('.swiper-slide').index();
        
        if ($('#popCardSelect .c_detail_slide .swiper-slide').length !== 1){

            var detailSwiper = new Swiper('#' + id + ' .c_detail_slide .swiper-container ', {//q10011 0721 복수개의 스와이퍼 팝업이 있는 케이스로 해당 아이디로 실행
                loop: true,
                autoHeight : true,
                navigation : {
                    prevEl : '#' + id + ' .swiper-button-prev',
                    nextEl : '#' + id + ' .swiper-button-next'
                },
                pagination : {
                    el : '.modal_card_view .swiper-pagination',
                    clickable :true,
                }
    
            });
            detailSwiper.on('activeIndexChange' , function(){
                cardTitle = $('.swiper-slide').eq(this.activeIndex).attr('data-card-title');
                cardCon = $('.swiper-slide').eq(this.activeIndex).attr('data-card-con');
                $('.card_name_info strong').text(cardTitle);
                $('.card_name_info p').text(cardCon);

                if ($('#metalTxt').length) { //메탈플레이트 유의사항 있는 경우에만 
                    if (cardCon.indexOf('메탈 플레이트') != -1 ) {
                        $('#metalTxt').show();
                    } else {
                        $('#metalTxt').hide();
                    }
                }
                
            });
            setTimeout(function(){detailSwiper.slideTo(idx + 1 , 500 , true);} , 200)
            
            
            $(document).on('click' , '.layer_close a' , function(){
                detailSwiper.destroy();
            });
        } else {
            $('.c_detail_slide .swiper-button-prev').hide();
            $('.c_detail_slide .swiper-button-next').hide();
        };

    }
}

var noPageAlret ='<div id="noMobileId" class="modal_pop modal_alert">' +
					'<div class="modal_wrap">' +
						'<div class="modal_container">' +
							'<div class="layer_wrap">' +
								'<div class="layer_body">해당 서비스는 <br>PC 홈페이지를 이용해 주세요</div>' +
								'<div class="layer_footer">' +
									'<div class="box_btn">' +
										'<a href="javascript:;" class="btn56_outline02_boldtxt" onclick="modal.close(\'noMobileId\', \'btnnoMobileId\'); return false;"><span>닫기</span></a>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>' ;


$(document).on('click' , '.no_page_mo' , function(e){
	e.preventDefault();
	$('body').append(noPageAlret);
	modal.open('noMobileId','')
});