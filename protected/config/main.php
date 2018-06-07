<?php

$urlRules = array(
   
    '/administrator' => '/admin/login',
    '/admin/login' => '/error',
    '/admin' => '/error',
    '/' => '/home/home',
    '<lang:\w+>/home/store' =>  'home/store',
    '<lang:\w+>/store' => 'home/store',
    '<lang:\w+>/home/news' =>  'home/news',
    '<lang:\w+>/news' => 'home/news',
    '<lang:\w+>/brand-history' => 'home/brandhistory',
    '<lang:\w+>/home/brandhistory' => 'home/brandhistory',
    '<lang:\w+>/legal' => 'home/legal',
    '<lang:\w+>/home/legal' => 'home/legal',
    '<lang:\w+>/contact-us' => 'home/contactus',
    '<lang:\w+>/home/contactus' => 'home/contactus',
    '<lang:\w+>/customer-service' => 'home/customerservice',
    '<lang:\w+>/home/customerservice' => 'home/customerservice',
    '<lang:\w+>/collections' => 'home/category',
    '<lang:\w+>/home/collections' => 'home/category',
    
    '<lang:\w+>' => 'home/home',
     '<lang:\w+>/home/home' => 'home/home',
    '<lang:\w+>/home' => 'home/home',
//    '<lang:\w+>/home/product/<category_id:\d+>' => 'home/product',
    '<lang:\w+>/collections/<categorySlug:[a-zA-Z0-9_ -]+>' => 'home/product',
    '<lang:\w+>/collections/<categorySlug:[a-zA-Z0-9_ -]+>/<model:[a-zA-Z0-9_ -.]+>' => 'home/productdetail',
    '<lang:\w+>/home/newsdetail/<news_id:\d+>' => 'home/newsdetail',
);
// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');
// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
    'basePath' => dirname(__FILE__) . DIRECTORY_SEPARATOR . '..',
    'name' => 'OLMA',
    // preloading 'log' component
    'preload' => array('log'),
    // autoloading model and component classes
    'import' => array(
        'application.models.*',
        'application.components.*',
        'application.components.EButtonColumnWithClearFilters',
        'application.components.jui_timepicker.JTimePicker',
        'ext.yii-mail.YiiMailMessage',
        'ext.restfullyii.components.*',
        'ext.eoauth.*',
        'ext.eoauth.lib.*',
        'ext.lightopenid.*',
        'ext.eauth.*',
        'ext.eauth.services.*',
    ),
 'components' => array(
        'custom' => array(
            'class' => 'ext.components.Custom',
        )),
    'defaultController' => 'index',
    // application components



    'modules' => array(
        'gii' => array(
            'class' => 'system.gii.GiiModule',
            'password' => 'hola',
//                'ipFilters' => array('127.0.0.1', '::1'),
        ), 'V1',
    ),
    'components' => array(
        'loid' => array(
            'class' => 'ext.lightopenid.loid',
        ),
        'eauth' => array(
            'class' => 'ext.eauth.EAuth',
            'popup' => true, // Use the popup window instead of redirecting.
            'cache' => false, // Cache component name or false to disable cache. Defaults to 'cache'.
            'cacheExpire' => 0, // Cache lifetime. Defaults to 0 - means unlimited.
            'services' => array(// You can change the providers and their classes.

                'facebook' => array(
                    // register your app here: https://developers.facebook.com/apps/
                    'class' => 'FacebookOAuthService',
                    'client_id' => '369289506568240',
                    'client_secret' => '91cd054f715c600884f5d4a5849503f6',
                ),
            ),
        ),
        'widgetFactory' => array(
            'widgets' => array(
                'EJuiTimePicker' => array(
                    'timeOptions' => array(
                        //   'buttonImage' => Yii::app()->request->baseUrl . '/images/calendar.png',
                        'buttomImageOnly' => true,
                        'buttonImage' => '../../images/game-time.png',
                        'buttonText' => '',
                        //  'showAnim' => 'fold',
                        'showOn' => 'button',
                    // 'showOn' => 'focus',
                    ),
                    'htmlOptions' => array(
                        'readonly' => 'readonly',
                        'autocomplete' => 'off',
                        'size' => 5,
                        'maxlength' => 5,
                    ),
                    'timeHtmlOptions' => array(
                        'size' => 5,
                        'maxlength' => 5,
                    ),
                    //'language' => 'lt',
                    'mode' => 'time',
                ),
            ),
        ),
        'mail' => array(
            'class' => 'ext.yii-mail.YiiMail',
            'transportType' => 'smtp',
            'transportOptions' => array(
                'host' => 'localhost',
                'username' => '',
                'password' => '',
                'port' => '25',
            ),
            'viewPath' => 'application.views.mail',
            'logging' => true,
            'dryRun' => false
        ),
        'user' => array(
            'loginUrl' => array('olmaadmin'),
            'allowAutoLogin' => true,
        ),
//        'db' => array(
//            'connectionString' => 'sqlite:protected/data/blog.db',
//            'tablePrefix' => 'tbl_',
//        ),
        // uncomment the following to use a MySQL database

        'db' => array(
//          'connectionString' => 'mysql:host=localhost;dbname=wgn',
          //  'connectionString' => 'mysql:host=localhost;dbname=olma_beta_1',
  'connectionString' => 'mysql:host=192.168.10.222;dbname=olma_live_V1',
            'emulatePrepare' => true,
            'username' => 'arlsc',
            'password' => 'arlsc',
            'charset' => 'utf8',
            'tablePrefix' => 'tbl_',
        ),
        'errorHandler' => array(
            // use 'site/error' action to display errors
            'errorAction' => 'error/error',
        ),
        'urlManager' => array(
            'caseSensitive' => true,
            'urlFormat' => 'path',
            'showScriptName' => false,
            'rules' => $urlRules,
        ),
        'log' => array(
            'class' => 'CLogRouter',
            'routes' => array(
                array(
                    'class' => 'CFileLogRoute',
                    'levels' => 'error, warning',
                ),
            // uncomment the following to show log messages on web pages
            /*
              array(
              'class'=>'CWebLogRoute',
              ),
             */
            ),
        ),
    ),
    'params' => array(
        'contactus' => 'olma@olma.com',
        'CHI' => '北京',
        'ENG' => 'Beijing',
        'ENGLISH' => 'english',
        'CHINESE' => 'chinese',
        'PAGESIZE' => 10,
        'adminModule' => 'administrator',
'MOBILE_INTERFACE_NAME' => 'mobile',
        'WEB_INTERFACE_NAME' => 'web',
        'RUNNING_MODE' => 'live'
    ),
        // application-level parameters that can be accessed
        // using Yii::app()->params['paramName']
        // 'params' => require(dirname(__FILE__) . '/params.php'),
);
