

<div class="news-article-section">
        <?php if (strtolower($this->cookieLangType) == 'english') { ?><h1>Brand Culture</h1> <?php } ?> 
        <?php if (strtolower($this->cookieLangType) == 'chinese') { ?><h1>品牌文化</h1> <?php } ?> 
        <div class="news-details">
            <?php
            if (!empty($getNewsDetail)) {
                ?>
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
                    
                    echo date('Y', strtotime($getNewsDetail['date']));echo $year;
                    
                    echo date('m', strtotime($getNewsDetail['date']));echo $month;
                   
                    echo date('d', strtotime($getNewsDetail['date'])); echo $day;
                    ?>



                </div>
                <div class="news-title"><?php echo $getNewsDetail['news_header']; ?></div>
                <p><?php echo $getNewsDetail['news_desc']; ?></p>
                <div class="news-img"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/upload/news/<?php echo $getNewsDetail['image']; ?>"></div>
                <p><?php echo $getNewsDetail['news_long_desc']; ?> </p>
                <hr class="grey">
                <?php if (strtolower($this->cookieLangType) == 'english') { ?> <a class="brown-btn" href="#" onclick="javascript:history.back();return false;">Back</a><?php } ?> 
                <?php if (strtolower($this->cookieLangType) == 'chinese') { ?> <a class="brown-btn" href="#" onclick="javascript:history.back();return false;">返回</a><?php } ?> 

<?php } ?>
        </div>
   
</div>

<div class="clr"></div>