<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/default/jquery-1.11.1.min.js" type="text/javascript" language="javascript"></script>
<?php if (strtolower($this->cookieLangType) == 'english') { ?><h1>Collections</h1> <?php } ?> 
<?php if (strtolower($this->cookieLangType) == 'chinese') { ?><h1>产品系列</h1> <?php } ?>
<div class="product_catetory_container" id="pro">
    <div class="product" id ="product">
        <?php 
           $i = 1;
        foreach ($getCategoryDetail as $val) {
            if ($i == 1) {
                    $class = 'first';
                    $i++;
                } else if ($i == 2) {
                    $class = 'middle';
                    $i++;
                } else if ($i == 3) {
                    $class = 'last';
                    $i = 1;
                }
            ?>

            <ul class="single_product <?php echo $class;?>" >
			    <li><h3 style="font-family:arial;"><?php echo $val['category_titleE']; ?></h3></li>
                <li><h4 style="font-family:黑体;"><?php echo $val['category_titleC']; ?></h4></li>
                <li>
                    <?php echo CHtml::link('<img src="../images/upload/category/' . $val['category_image'] . '"/>', array($this->langType . '/collections/' . $val['categorySlug'])); ?>
                </li>
               
              <!--  <li class ="more"> <?php
                if (strtolower($this->cookieLangType) == 'english') {
                    echo CHtml::link('More', array($this->langType . '/collections/' . $val['categorySlug']));
                } else if (strtolower($this->cookieLangType) == 'chinese') {
                    echo CHtml::link('立即探索', array($this->langType . '/collections/' . $val['categorySlug']));
                }
                    ?>
                </li> -->
            </ul>
        <?php } ?>

        <div class="clr"></div>
    </div>
    <input type="hidden" name="totalCount" id="totalCount" value="<?php echo $totalCount; ?>">
    <input type ="hidden" id ="sInterFaceType" value ="<?php echo $sInterFaceType; ?>">

    <?php if ($totalCount > 6 && $sInterFaceType == 'web') { ?>
        <div id="loader_image" style ="text-align: center;">
            <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/loader.gif" >

        </div>
    <?php } else if ($sInterFaceType == 'mobile') {
        ?>
        <div id="loader_image" style ="text-align: center;">
            <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/loader.gif" >

        </div> 
    <?php }
    ?>
</div>


<script type="text/javascript">
    var busy = false;
    var sInterFaceType = $('#sInterFaceType').val();
    if(sInterFaceType =='mobile') 
    {
        var limit =2;
    }
    else {
        var limit =6;
    }
    var offset = 0;
    var stopScroll = 0;

    function displayRecords(lim, off,scrollval) {
        var tCount = $('#totalCount').val();
        if((tCount > 6 && sInterFaceType =='web') || (sInterFaceType =='mobile')) {
            if(scrollval==0)
            {
                $.ajax({
                    type: "POST",
                    async: false,
                    url: "<?php echo Yii::app()->createAbsoluteUrl('home/category/'); ?>",
                    data: "limit=" + lim + "&offset=" + off,
                    cache: false,
                    beforeSend: function() {
                  
                        $('#loader_image').show();
                    
                    },
                    success: function(html) {
                        $("#product").append(html);
                        //                $('#pro').hide();
                        $("#loader_image").hide();
                        if (html == "") {
                            stopScroll = 1; 
                            $("#loader_message").html('No more records....').show()
                        } else {
                            $("#loader_message").html('Loading please wait...').show();
                        }
                        window.busy = false;


                    }
                });
            }}}
    $(document).ready(function() {
       
        $(window).scroll(function() {
            if ($(window).scrollTop() == ($(document).height()-$(window).height()) && !busy) {
                busy = true;
                offset = limit + offset;
                setTimeout(function() {
                    displayRecords(limit, offset,stopScroll); }, 300);
            }
        });
    });

   

</script>