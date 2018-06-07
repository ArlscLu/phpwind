<script src="<?php echo Yii::app()->request->baseUrl; ?>/js/default/jquery-1.11.1.min.js" type="text/javascript" language="javascript"></script>

<?php 
if (empty($getProductListing)) {?>
<style>
body {background:#0f0f0f !important;}
.container, .product_listing_container{margin:0 auto !important;}
.footer{position:absolute !important;}
</style>
<?php } ?>
<?php if (strtolower($this->cookieLangType) == 'english') {
	 if (!empty($getProductListing)) {?>
	<h1 style="font-size:20px;"><?php echo $categoryName; ?></h1> 
    <?php  
}}
?> 

<?php if (strtolower($this->cookieLangType) == 'chinese') {
	 if (!empty($getProductListing)) {?>
	<h1  style="font-size:20px;"><?php echo $categoryName; ?></h1> 
    <?php  
}}
?> 
<div class="product_listing_container">
    <div class="product" id ="product">
        <?php
        if (!empty($getProductListing)) {
           $i = 1; 
            foreach ($getProductListing as $val) {
 
                ?>
                <ul class="single_product">



                    <li>
                        <?php echo CHtml::link('<img src="../../images/upload/product/' . $val['product_image'] . '"/>', array($this->langType . '/collections/' . $categorySlug . '/' . $val['model'])); ?>
                        <div class="clearfix"></div>
                        <span class="product_code" style="font-family: Arial !important;"><?php echo $val['model']; ?></span>
                    </li>


                </ul>
				<?php 
				
				if($i%3==0)
				{
					?> <div class="clearfix"></div>
				<?php	
				}$i++;
				?>
				
                <?php
            }
        } else {
            if (strtolower($this->cookieLangType) == 'english') {
                ?> <div class="no-product"><a href="<?php echo Yii::app()->request->baseUrl; ?>/<?php echo $this->langType; ?>/collections"> <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/en-error.png"/></a></div>
                <?php
            } else  if (strtolower($this->cookieLangType) == 'chinese') {
                ?> <div class="no-product"> <a href="<?php echo Yii::app()->request->baseUrl; ?>/<?php echo $this->langType; ?>/collections"> <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/cn-error.png"/> </a></div>
                <?php
            }
        }
        ?>
    </div>
</div>
<input type ="hidden" id ="cat" value ="<?php echo $category_id; ?>">
<input type ="hidden" id ="sInterFaceType" value ="<?php echo $sInterFaceType; ?>">
<div class="clr"></div>
<?php if ($totalCount > 1 ) { ?>
    <div id="loader_image" style ="text-align: center;">
        <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/loader.gif" >
<?php } ?> 
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
        var cat = $('#cat').val();
        if(scrollval==0)
        {
            $.ajax({
                type: "POST",
                async: false,
                url: "<?php echo Yii::app()->createAbsoluteUrl('home/product/'); ?>",
                data: "limit=" + lim + "&offset=" + off+ "&cat=" + cat,
                cache: false,
                beforeSend: function() {
                    $('#loader_image').show();
                },
                success: function(html) { 
                    $("#product").append(html);
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
        }}
    $(document).ready(function() {
    
        $(window).scroll(function() { 
            if ($(window).scrollTop() + $(window).height() > $("#product").height() && !busy) {
                busy = true;
                offset = limit + offset;
                setTimeout(function() { 
                    displayRecords(limit, offset,stopScroll); }, 1000);
            }
        });
    });

   

</script>