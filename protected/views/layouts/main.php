<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>OLMA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        <link rel="icon" type="image/png" href="<?php echo Yii::app()->request->baseUrl; ?>/images/favicon.png" />
        <?php if (strtolower(Yii::app()->params['RUNNING_MODE']) == 'live') { ?>
            <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/bootstrap-theme.min.css">
            <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/default-theme.min.css">
            <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/style.min.css">
        <?php } else {
            ?>
            <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/bootstrap-theme.css">
            <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/bootstrap.css">
            <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/default-theme.css">
            <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/style.css">
        <?php } ?>
    </head>
    <body>

        <!---header start from here -->
        <header class="">

            <section class="head-middle-blue">


                <section style="text-align:center;"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/logo.png" title="" alt="" /></section>


            </section>
            <!---header middle blue end here -->  

            <!---header bottom blk start from here -->
            <section class="head-bottom-blk">
                <section class="container">
                    <section class="row">
                        <ul class="admin_menu">
                            <li class="<?php echo (Yii::app()->controller->id === 'banner') ? 'active' : ''; ?>"><?php echo CHtml::link('Homepage', array('banner/admin')); ?>&nbsp;&nbsp;|&nbsp;</li>
                            <li class="<?php echo (Yii::app()->controller->id === 'category') ? 'active' : ''; ?>"><?php echo CHtml::link('Collections', array('category/admin')); ?>&nbsp;|&nbsp;</li>
                            <li class="<?php echo (Yii::app()->controller->id === 'product') ? 'active' : ''; ?>"><?php echo CHtml::link('Product', array('product/admin')); ?>&nbsp;|&nbsp;</li>
                            <li class="<?php echo (Yii::app()->controller->id === 'store') ? 'active' : ''; ?>"><?php echo CHtml::link('Store', array('store/admin')); ?>&nbsp;|&nbsp;</li>
                            <li class="<?php echo (Yii::app()->controller->id === 'content') ? 'active' : ''; ?>"><?php echo CHtml::link('Content Page', array('content/admin')); ?>&nbsp;|&nbsp;</li>
                            <li class="<?php echo (Yii::app()->controller->id === 'contact') ? 'active' : ''; ?>"><?php echo CHtml::link('Contact', array('contact/admin')); ?></li>
                            <li class="<?php echo (Yii::app()->controller->id === 'news') ? 'active' : ''; ?>"><?php echo CHtml::link('News', array('news/admin')); ?></li>

                        </ul>

                        <ul class="right-header admin_menu">
                            <li class="<?php echo (Yii::app()->controller->id === 'setting' && Yii::app()->controller->action->id === 'changepassword') ? 'active' : ''; ?>"><?php echo CHtml::link('Change Password', array('setting/changepassword')); ?>&nbsp;|&nbsp;</li>
                            <li class="<?php echo (Yii::app()->controller->id === 'setting' && Yii::app()->controller->action->id === 'admin' ) ? 'active' : ''; ?>"><?php echo CHtml::link('Setting', array('setting/admin')); ?>&nbsp;|&nbsp;</li>
                            <li><?php echo CHtml::link('Logout', array('admin/logout')); ?></li>
                        </ul>

                    </section>
                </section>
            </section>
            <!---header bottom blk end here --> 


        </header>



        <section class="olma-container"><?php
            $needle = 'Error 404';
            if (strpos($content, $needle) !== false) {
                ?>
                <div class ="text-center well"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/404error.jpg" title="" alt="" /></div>
                <?php
            } else {
                echo $content;
            }
            ?></section>

        <!---footer bottom blk start from here -->
        <footer class="">
            <section class="container">
                <!---footer blk start from here -->
                <section class="row footer-blk">
                    <section class="left col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <ul>
                            <li><a href="#" class="first">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">How It Works</a></li>
                            <li><a href="#">Faq</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </section>
                    <section class="right col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <?php echo date('Y'); ?> OLMA Watches Co. Ltd.,  All rights reserved
                    </section>
                </section>
                <!---footer blk end here -->
            </section>
        </footer>
        <!---footer bottom blk end here --> 

        <!---main container end here -->
    </body>
</html>
