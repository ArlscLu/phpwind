<div class="product_detail_container">
    <?php if (!empty($getProductDetail)) { ?>
	     <div class=" product_description mobile-show">
		   <h2><?php echo $getProductDetail['product_title']; ?></h2>
            <p class="grey"><?php echo $getProductDetail['model']; ?></p>
		 
		 </div>
        <div class="product_image">
            <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/upload/product/<?php echo $getProductDetail['product_image']; ?>"/>
        </div>
        <div class="product_description">
           <div class="mobile-hide"> <h2><?php echo $getProductDetail['product_title']; ?></h2>
            <p class="grey"><?php echo $getProductDetail['model']; ?></p>
			</div>
            <hr class="grey" />
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td width="70" class="grey">
                        <?php if (strtolower($this->cookieLangType) == 'english') { ?> 
                            Dimension<?php } ?> 
                        <?php if (strtolower($this->cookieLangType) == 'chinese') { ?> 
                            尺寸<?php } ?>
                    </td>
                    <td><?php echo $getProductDetail['case_diameter']; ?></td>
                </tr>
                <tr>
                    <td class="grey">
                        <?php if (strtolower($this->cookieLangType) == 'english') { ?> 
                            Case<?php } ?> 
                        <?php if (strtolower($this->cookieLangType) == 'chinese') { ?> 
                            表壳<?php } ?>
                        </td>
                    <td><?php echo $getProductDetail['case']; ?></td>
                </tr>
                <tr>
                    <td class="grey">
                         <?php if (strtolower($this->cookieLangType) == 'english') { ?> 
                            Dial<?php } ?> 
                        <?php if (strtolower($this->cookieLangType) == 'chinese') { ?> 
                            表面<?php } ?>
                        </td>
                    <td><?php echo $getProductDetail['dial_color']; ?></td>
                </tr>
                <tr>
                    
                        <?php if (strtolower($this->cookieLangType) == 'english') { ?> 
                        <td width="100px" class="grey">    Water Resistance<?php } ?>  </td>
                        <?php if (strtolower($this->cookieLangType) == 'chinese') { ?> 
                          <td  class="grey">  防水<?php } ?>
                        </td>
                    <td><?php echo $getProductDetail['water_resistent']; ?></td>
                </tr>
            </table>

            <ul class="actions">
                <?php if (strtolower($this->cookieLangType) == 'english') { ?> <li><a href="<?php echo Yii::app()->request->baseUrl; ?>/<?php echo $this->langType; ?>/store">Shop Lists</a></li><?php } ?> 
                <?php if (strtolower($this->cookieLangType) == 'chinese') { ?><li><a href="<?php echo Yii::app()->request->baseUrl; ?>/<?php echo $this->langType; ?>/store">查询销售店铺</a></li><?php } ?> 
                <?php if (strtolower($this->cookieLangType) == 'english') { ?> <li><a href="<?php echo Yii::app()->request->baseUrl; ?>/<?php echo $this->langType; ?>/contact-us">Customer Hotline</a></li><?php } ?> 
                <?php if (strtolower($this->cookieLangType) == 'chinese') { ?><li><a href="<?php echo Yii::app()->request->baseUrl; ?>/<?php echo $this->langType; ?>/contact-us">致电客服</a></li><?php } ?> 
            </ul><div class="clr"></div>
            <?php if (strtolower($this->cookieLangType) == 'english') { ?> <p class="grey">Please note that images are stock photographs and that colors and sizes may not exactly correspond to actual products.</p><?php } ?> 
            <?php if (strtolower($this->cookieLangType) == 'chinese') { ?><p class="grey">请注意，图像为库存照片，其颜色和尺寸不一定完全对应实际产品。</p><?php } ?> 

        </div>
    <?php } ?>
</div>
</div>
<div class="clr"></div>

<!-- Related Products-->
<div class="related_products">

    <div class="container">
      <?php if (strtolower($this->cookieLangType) == 'english') { ?> 
	  <h2>Discover more <?php echo $categoryName;?></h2><?php } ?> 
	  <?php if (strtolower($this->cookieLangType) == 'chinese') { ?> 
                            <h2>探索更多<?php echo $categoryName;?></h2><?php } ?>
	  
        <div id="related_products" class="owl-carouse">
            <?php
            if (!empty($getProductListingCategoryWise)) {
                foreach ($getProductListingCategoryWise as $value) {
                    ?>
                    <div class="item">
                        <?php echo CHtml::link('<img src="../../../images/upload/product/' . $value['product_image'] . '"/>', array($this->langType . '/collections/' . $value['slug'] . '/' . $value['model'])); ?>
                        <span class="grey item_title"><?php echo $value['model']; ?>
                        </span>
                    </div>
                <?php
                }
            }
            ?>
        </div>
    </div>
</div>