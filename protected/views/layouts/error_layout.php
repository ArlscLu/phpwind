
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>OLMA</title>
        <meta name="author" content="" />
        <meta name="description" content="" />
        <meta name="keywords"  content="" />
        <meta name="Resource-type" content="Document" />
        <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/default/style.css">
    </head>
    <body style ="background: #0f0f0f !important">

        <div class="header">
            <div class="logo"><a href="<?php echo Yii::app()->request->baseUrl; ?>/home"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/logo.png" alt="Logo" /></a></div>
            <nav id="navigation">



            </nav>
        </div>
        
        <div class="container">
            <?php
            $needle = 'Error 404'; 
            $needle1 = 'Error 500';
            if (strpos($content, $needle) !== false || strpos($content, $needle1) !== false) {
                ?><p class="backClass" style="float:right; "><a href="<?php echo Yii::app()->request->baseUrl; ?>/home">Back</a></p>
                <div class="no-product" ><a href="<?php echo Yii::app()->request->baseUrl; ?>/home"><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/bg-404.jpg" title="" alt="" /></a></div>
                    <?php
                } else {
                    echo $content;
                }
                ?></div>

    </body>
</html>

