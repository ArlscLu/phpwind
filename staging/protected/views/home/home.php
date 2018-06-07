<!-- Banner Slider-->
<div class="mobile-hide">
<?php if (!empty($bannerList)) { ?>

    <div id="home_coursel" class="owl-carousel">
        <?php foreach ($bannerList as $key) { ?>
            <div class="item"> 
            <?php
            if ($key['pageType'] == 'C') {
                $page = $this->langType . '/collections/' . $key['slugType'];
            } else if ($key['pageType'] == 'P') {
                $page = $this->langType . '/collections/' . $key['slugType'] . '/' . $key['model'];
            }
            ?>
                <a href="<?php echo Yii::app()->request->baseUrl; ?>/<?php echo $page; ?>">
                    <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/upload/<?php echo $key['banner_image']; ?>" title="<?php echo $key['altTitle']; ?>" alt="<?php echo $key['altTitle']; ?>" />
                </a>
                <!--<div class="button"> <img src="<?php //echo Yii::app()->request->baseUrl;  ?>/images/slide-1-link.png" width="200" height="84" /> <a href="" class="">了解更多</a> </div>-->
            </div>
    <?php } ?>


    </div>
<?php } else {
    ?> <div>
    <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/slide-1.jpg" title="" alt="" /> </div>
<?php } ?>

 </div>

<!-- Banner Slider-->
<div class="mobile-show">
<?php if (!empty($bannerList)) {  ?>

    <div id="home_coursel-1" class="owl-carousel">
        <?php foreach ($bannerList as $key) {  ?>
            <div class="item"> 
            <?php
            if ($key['pageType'] == 'C') {
                $page = $this->langType . '/collections/' . $key['slugType'];
            } else if ($key['pageType'] == 'P') {
                $page = $this->langType . '/collections/' . $key['slugType'] . '/' . $key['model'];
            }
            ?>
                <a href="<?php echo Yii::app()->request->baseUrl; ?>/<?php echo $page; ?>">
                    <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/upload/<?php echo $key['banner_mobile_image']; ?>" title="<?php echo $key['altTitle']; ?>" alt="<?php echo $key['altTitle'];  ?>" />
                </a>
            </div>
			
    <?php } ?>

</div>
   
<?php } else {
    ?> <div>
    <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/slide-1.jpg" title="" alt="" /> </div>
<?php } ?>

 </div>

