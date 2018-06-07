      <style>
	  .outer-section{background:#0f0f0f;}
	  </style>




	  <?php if (strtolower($this->cookieLangType) == 'english') { ?><h1 class="">Brand Culture</h1> <?php } ?> 
        <?php if (strtolower($this->cookieLangType) == 'chinese') { ?><h1 class="">品牌文化</h1> <?php } ?> 
        <div class="news-section">
            <div class="select-box" >
                <select onchange ="return filterNewsList(this.value);" style="font-family:Arial;">
					 <option>2017</option>
                     <option>2016</option>
                    <option>2015</option>
                    <option>2014</option>
                    <option>2013</option>
                    <option>2012</option>
                    <option>2011</option>
                </select>
            </div>
            <div class="clr"></div>
            <div id ="news">
                <?php
                if (!empty($getNewsList)) {
                    foreach ($getNewsList as $value) {
                        ?>
                        <div class="news">
						     <div class="news-details mobile-show">
                                <div class="news-date">
                                    <?php
                                    if (strtolower($this->cookieLangType) == 'english') {
                                        $day = '(Day)';
                                        $month = '(Month) ';
                                        $year = '(Year) ';
                                    }
                                    if (strtolower($this->cookieLangType) == 'chinese') {
                                        $day = '日';
                                        $month = '月';
                                        $year = '年';
                                    }

                                    echo date('Y', strtotime($value['date']));
                                    echo $year;

                                    echo date('m', strtotime($value['date']));
                                    echo $month;

                                    echo date('d', strtotime($value['date']));
                                    echo $day;
                                    ?>


                                </div>
                                  <div class="news-title">
                                    <?php echo CHtml::link($value['news_header'], array($this->langType.'/home/newsdetail/' . $value['news_id']), array('news_id' => $value['news_id'])); ?> 
                                    </div>
                            </div><div class="clr"></div>
                            <div class="news-img">
                                <?php echo CHtml::link('<img src="../images/upload/news/' . $value['image'] . '"/>', array($this->langType.'/home/newsdetail/' . $value['news_id']), array('news_id' => $value['news_id'])); ?> 
                            </div>
                            <div class="news-details mobile-hide">
                                <div class="news-date">
                                    <?php
                                    if (strtolower($this->cookieLangType) == 'english') {
                                        $day = '(Day)';
                                        $month = '(Month) ';
                                        $year = '(Year) ';
                                    }
                                    if (strtolower($this->cookieLangType) == 'chinese') {
                                        $day = '日';
                                        $month = '月';
                                        $year = '年';
                                    }

                                    echo date('Y', strtotime($value['date']));
                                    echo $year;

                                    echo date('m', strtotime($value['date']));
                                    echo $month;

                                    echo date('d', strtotime($value['date']));
                                    echo $day;
                                    ?>


                                </div>
                                <div class="news-title">
                                    <?php echo CHtml::link($value['news_header'], array($this->langType.'/home/newsdetail/' . $value['news_id']), array('news_id' => $value['news_id'])); ?> 
                                    </div>
                            </div><div class="clr"></div>
                        </div>

                        <hr class="grey">
                        <?php
                    }
                } else {
                    if (strtolower($this->cookieLangType) == 'english') { ?> 
					<div class="no-product" ><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/en-news.jpg" title="" alt="" /></div>
					<?php
                }else if (strtolower($this->cookieLangType) == 'chinese') { ?>
				 <div class="no-product" ><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/cn-news.jpg" title="" alt="" /></div>
				<?php }}
                ?></div>
        </div>
   
<div class="clr"></div>
<script>
    function filterNewsList(val)
    { 
        $.ajax({
            type: "POST",
            async: false,
            url: "<?php echo Yii::app()->createAbsoluteUrl('home/news/'); ?>",
            data: "year=" + val,
            cache: false,
            success: function(html) { 
                $("#news").html(html);
            }
        });
    }
</script>