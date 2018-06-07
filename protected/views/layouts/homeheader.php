<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		 <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>OLMA</title>
        <meta name="author" content="" />
        <meta name="description" content="" />
        <meta name="keywords"  content="" />
        <meta name="Resource-type" content="Document" />
		<link rel="icon" type="image/png" href="<?php echo Yii::app()->request->baseUrl; ?>/images/favicon.png" />
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/js/default/jquery.min.js" type="text/javascript" language="javascript"></script>
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/js/default/global.js" type="text/javascript" language="javascript"></script>
        <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/default/style.css?1">
        <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/default/owl.theme.css">
        <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/default/owl.carousel.css">
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/js/default/jquery.dropdown.js" type="text/javascript" language="javascript"></script>
        <script>
            $(document).ready(function() {
               
                $('#showmenu').click(function() {
                    $('#navigation ul').slideToggle();
					$(".submenu").hide();
                });
            
            });
			
				
			
        </script>
			<script>
				$(document).ready(function(){
					$(".submenu-list-item").click(function(){
						
						$(".submenu").slideToggle();
						 $(this).toggleClass("in");
					});
				});
				
				</script>
				
		   <?php if ($this->cookieLangType == 'English') { ?>
            <style> body{font-family:Arial, Helvetica, sans-serif ;}
                 #select_language button{font-family:"SimHei","黑体" !important;}
            </style>
        <?php } else if ($this->cookieLangType == 'Chinese') { ?>
            <style> body{font-family:"SimHei","黑体", Arial, Helvetica, sans-serif ;}
               #select_language button{font-family:Arial,Helvetica,sans-serif !important;}
            </style>

        <?php }
        ?>
    </head>
    <body>
         <div class="outer-section">
        <div class="header">
            <div class="logo mobile-hide"><a href="<?php echo Yii::app()->request->baseUrl; ?>/<?php echo $this->langType;?>/home"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/logo.png" alt="Logo" /></a></div>
            
		   <nav id="navigation">
                <div class="toggle-btn" id="showmenu"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/menu.png" /></div>
                <?php if ($this->cookieLangType == 'Chinese') { ?>
                    <ul>
                        <li><?php echo CHtml::link('品牌历史', array($this->langType . '/brand-history'), ($this->action->id == 'brandhistory') ? array('class' => 'active') : array()); ?>

                        </li>
                        <li><?php echo CHtml::link('产品系列', array($this->langType . '/collections'), (($this->action->id == 'category') || ($this->action->id == 'product') || ($this->action->id == 'productdetail')) ? array('class' => 'active') : array()); ?>

                        </li>
                        <li class="submenu-list-item"><a class="<?php if($this->action->id == 'store' || $this->action->id == 'customerservice' ){  echo 'active'; } else { echo '';}; ?>" >为您服务</a>
                            <ul class="submenu">
                                <li><?php echo CHtml::link('保养中心', array($this->langType . '/customer-service'), ($this->action->id == 'customerservice') ? array('class' => 'active') : array()); ?></li>
                                <li><?php echo CHtml::link('经销网点', array($this->langType . '/store'), ($this->action->id == 'store') ? array('class' => 'active') : array()); ?></li>
                            </ul>
                        </li>
                        <li><?php echo CHtml::link('联系我们', array($this->langType . '/contact-us'), ($this->action->id == 'contactus') ? array('class' => 'active') : array()); ?></li>
                        <li><?php
                if (!empty($this->menuTab) && $this->menuTab['news'] == 'show') {
                    echo CHtml::link('品牌文化', array($this->langType . '/news'), ($this->action->id == 'news') ? array('class' => 'active') : array());
                }
                    ?>
                        </li>
                    </ul>
                <?php } ?>
                <?php if ($this->cookieLangType == 'English') { ?>
                    <ul>
                        <li><?php echo CHtml::link(' History', array($this->langType . '/brand-history'), ($this->action->id == 'brandhistory') ? array('class' => 'active') : array()); ?>

                        </li>
                        <li><?php echo CHtml::link('Collection', array($this->langType . '/collections'), (($this->action->id == 'category') || ($this->action->id == 'product') || ($this->action->id == 'productdetail')) ? array('class' => 'active') : array()); ?>

                        </li>
                        <li class="submenu-list-item"><a class="<?php if($this->action->id == 'store' || $this->action->id == 'customerservice' ){  echo 'active'; } else { echo '';}; ?>" > Services</a>
						 <ul class="submenu">
                                <li><?php echo CHtml::link('Service Center', array($this->langType . '/customer-service'), ($this->action->id == 'customerservice') ? array('class' => 'active') : array()); ?></li>
                                <li><?php echo CHtml::link('Distributors', array($this->langType . '/store'), ($this->action->id == 'store') ? array('class' => 'active') : array()); ?></li>
                            </ul>
                        </li>
                        <li><?php echo CHtml::link('Contact us', array($this->langType . '/contact-us'), ($this->action->id == 'contactus') ? array('class' => 'active') : array()); ?></li>
                        <li><?php
                if (!empty($this->menuTab) && $this->menuTab['news'] == 'show') {
                    echo CHtml::link('Brand Culture', array($this->langType . '/news'), ($this->action->id == 'news') ? array('class' => 'active') : array());
                }
                    ?>
                        </li>
                    </ul>
                <?php } ?>
                 <div class="select_language" id="select_language">
                    <?php
                    if ($this->cookieLangType == 'English') {
                        $language = '中文';
                    } else if ($this->cookieLangType == 'Chinese') {
                        $language = 'English';
                    }
                    ?>

                    <?php if (!empty($this->menuTab) && $this->menuTab['language'] == 'show') { ?>
                        <button type = "submit" id = "toggleButton" value = "<?php echo $this->cookieLangType; ?>"><?php echo $language;
                        ?> </button>
                    <?php }
                    ?> </div>


            </nav>
        </div>
<?php echo $content; ?>
</div>
        <footer>
        <?php if ($this->cookieLangType == 'English') { ?>
                <div class="footer_left">&copy; <?php echo date('Y'); ?> OLMA Watches Co. Ltd., &nbsp; All rights reserved | <?php echo CHtml::link('Legal Disclaimer', array($this->langType. '/legal')); ?></div>
            <?php } ?>
            <?php if ($this->cookieLangType == 'Chinese') { ?>
                <div class="footer_left" style="font-family:arial !important;">&copy; <?php echo date('Y'); ?> 龙马珍公司 | <?php echo CHtml::link('法律', array($this->langType. '/legal')); ?></div>
            <?php } ?>
            <?php if ($this->cookieLangType == 'Chinese') { ?>
                <ul class="footer_right">
                    <li>我们的频道</li>
                    <!--<li><a href="#"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/icon1.png" height="21" width="25" /></a></li>-->
                    <li><a class="qr_button" href="javascript:void(0)"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/chat.png" height="21" width="25" /></a>
					 <div class="qr_code" style="display:none; z-index:1000"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/qr-code.jpg" /></div>
					</li>
                </ul>
<?php } ?>
<?php if ($this->cookieLangType == 'English') { ?>
                <ul class="footer_right">
                    <li> OUR CHANNEL</li>
                     <li><a class="qr_button" href="javascript:void(0)"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/chat.png" height="21" width="25" /></a>
					
					   <div class="qr_code" style="display:none; z-index:1000"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/qr-code-en.jpg" /></div>
					
					</li>
                </ul>
<?php } ?>
           
        </footer>
        <script src="<?php echo Yii::app()->request->baseUrl; ?>/js/default/owl.carousel.js" type="text/javascript" language="javascript"></script>
    </body>
</html>
<script>
    function onchangeValue(val){  var myData = "value="+val;
        $.ajax({
            type: 'POST',
            url: '<?php echo Yii::app()->createAbsoluteUrl("home/index"); ?>',
            data: myData,
             
            success: function(data) {
                window.location.reload();
            },
            error: function(data) { // if error occured
                alert("Error occured.please try again");
                return false;
            }
        });   
    }
    $('#toggleButton').click(function(){
        var val = $('#toggleButton').val();
        if(val=='Chinese'){
            var value = 'English';
        }
        else {
            var value = 'Chinese';
        }
        var myData = "value="+value;
        $.ajax({
            type: 'POST',
            url: '<?php echo Yii::app()->createAbsoluteUrl("home/index"); ?>',
            data: myData,
             
            success: function(data) {
                var currentURL = window.location.toString();
                if(val=='Chinese'){
                    window.location=  currentURL.replace ('/cn/','/en/');
                }
                else {
                    window.location=currentURL.replace ('/en/','/cn/');
                   
                }
            },
            error: function(data) { // if error occured
                alert("Error occured.please try again");
                return false;
            }
        });   
			
    });
</script>

