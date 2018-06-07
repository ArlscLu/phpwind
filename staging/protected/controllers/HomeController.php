<?php

class HomeController extends ControllerChild {

//    public $cookieLangType;
//    public $langType;
    public $categoryModel;
    public $productModel;
    public $newsModel;
    public $contentModel;
    public $contactModel;
    public $menuTab;
    public $sInterFaceType;

    public function init() {
        parent::init();
//        if (isset(Yii::app()->request->cookies['lang_type']->value)) {
//            $this->cookieLangType = Yii::app()->request->cookies['lang_type']->value;
//        } else {
//            $this->cookieLangType = 'Chinese';
//        }
//        if (strtolower($this->cookieLangType) == 'english') {
//            $this->langType = 'en';
//            
//        } else if (strtolower($this->cookieLangType) == 'chinese') {
//            $this->langType = 'cn';
//        }
        $this->categoryModel = new Category();
        $this->productModel = new Product();
        $this->newsModel = new News();
        $this->contentModel = new Content();
        $this->contactModel = new Contact();
        $getNewsSetting = Setting::model()->findAllByAttributes(array('name' => 'news', 'status' => 1));
        $getLanguageSetting = Setting::model()->findAllByAttributes(array('name' => 'language', 'status' => 1));
        $this->menuTab['news'] = 'hide';
        $this->menuTab['language'] = 'hide';
        if (!empty($getNewsSetting)) {
            $this->menuTab['news'] = 'show';
        }
        if (!empty($getLanguageSetting)) {
            $this->menuTab['language'] = 'show';
        }
//        $this->sInterFaceType = 'mobile';
        $this->sInterFaceType = Custom ::getWebsiteInterface();
//        echo Yii::app()->urlManager->parseUrl(Yii::app()->request);
//        
//        die; 
    }

    /**
     * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
     * using two-column layout. See 'protected/views/layouts/column2.php'.
     */
    public $layout = 'header';

    /**
     * @return array action filters
     */
    public function filters() {
        return array(
            'accessControl', // perform access control for CRUD operations
            'postOnly + delete', // we only allow deletion via POST request
        );
    }

    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function actionHome() {
        $this->layout = 'homeheader';
        $model = new Banner();
        $preview = '';
        if (isset($_GET['preview']) || (isset(Yii::app()->request->cookies['previewAdmin']->value) && !empty(Yii::app()->request->cookies['previewAdmin']->value))) {
            $preview = 'preview';
        }
        $criteria = new CDbCriteria();
        if ((!Yii::app()->user->isGuest && Yii::app()->user->aUserData['roleType'] == 'A') || (isset($preview) && !empty($preview))) {
            $criteria->condition = 'status = :status';
            $criteria->params = array(':status' => 1);
            $criteria->order = 'order_by asc';
            $getBannerDetail = Banner::model()->findAll($criteria);
        } else {
            $criteria->condition = 'status = :status AND show_status = :show_status';
            $criteria->params = array(':status' => 1, ':show_status' => 'P');
            $criteria->order = 'order_by asc';
            $getBannerDetail = Banner::model()->findAll($criteria);
        }


        $bannerList = array();
        if (strtolower($this->cookieLangType) == 'english') {
            foreach ($getBannerDetail as $key => $val) {
                $bannerList[$key]['banner_image'] = $val->banner_image_eng;
                $bannerList[$key]['banner_title'] = $val->banner_title_eng;
                $bannerList[$key]['banner_mobile_image'] = $val->banner_mobile_image;
                $bannerList[$key]['altTitle'] = $val->banner_alt_title_eng;
                $type = $bannerList[$key]['pageType'] = (!empty($val->category_page) ? 'C' : 'P');
                $iRedirectPageId = (!empty($val->category_page) ? $val->category_page : $val->product_page);
                if ($type == 'C') {
                    $getCategotyDetail = Category::model()->findByAttributes(array('id' => $iRedirectPageId));
                    $bannerList[$key]['slugType'] = $getCategotyDetail->category_slug;
                } else if ($type == 'P') {
                    $getProductDetail = Product::model()->findByAttributes(array('id' => $iRedirectPageId));
                    $getCategotyDetail = Category::model()->findByAttributes(array('id' => $getProductDetail->category_id));
                    $bannerList[$key]['model'] = $getProductDetail->product_model_eng;
                    $bannerList[$key]['slugType'] = $getCategotyDetail->category_slug;
                }

                $getBannerDetail[$key] = $val;
            }
        } else if (strtolower($this->cookieLangType) == 'chinese') {
            foreach ($getBannerDetail as $key => $val) {
                $bannerList[$key]['banner_image'] = $val->banner_image_chi;
                $bannerList[$key]['banner_mobile_image'] = $val->banner_mobile_image_chi;
                $bannerList[$key]['altTitle'] = $val->banner_alt_title_chi;
                $type = $bannerList[$key]['pageType'] = (!empty($val->category_page) ? 'C' : 'P');
                $iRedirectPageId = (!empty($val->category_page) ? $val->category_page : $val->product_page);
                if ($type == 'C') {
                    $getCategotyDetail = Category::model()->findByAttributes(array('id' => $iRedirectPageId));
                    $bannerList[$key]['slugType'] = $getCategotyDetail->category_slug;
                } else if ($type == 'P') {
                    $getProductDetail = Product::model()->findByAttributes(array('id' => $iRedirectPageId));
                    $getCategotyDetail = Category::model()->findByAttributes(array('id' => $getProductDetail->category_id));
                    $bannerList[$key]['model'] = $getProductDetail->product_model_eng;
                    $bannerList[$key]['slugType'] = $getCategotyDetail->category_slug;
                }
            }
        }
        $this->render('home', array(
            'model' => $model, 'bannerList' => $bannerList,
        ));
    }

    public function actionIndex() {
        $sLanguage = Yii::app()->getRequest()->getParam('value');
        Yii::app()->request->cookies['lang_type'] = new CHttpCookie('lang_type', $sLanguage);
        Yii::app()->user->setState("cityHeader", null);
//        die;
    }

    public function actionStore() {
        $model = new Store();

        $getDetail = array();
        $city;

        $preview = '';
        if (isset($_GET['preview']) || (isset(Yii::app()->request->cookies['previewAdmin']->value) && !empty(Yii::app()->request->cookies['previewAdmin']->value))) {
            $preview = 'preview';
        }
        if (!empty(Yii::app()->request->isAjaxRequest)) {
            Yii::app()->user->setState("cityHeader", null);
            $city = Yii::app()->getRequest()->getParam('cityVal');
            Yii::app()->user->setState('cityHeader', $city);
        } else {
            if (strtolower($this->cookieLangType) == Yii::app()->params['CHINESE']) {
                $globalCity = Yii::app()->params['CHI'];
            } else if (strtolower($this->cookieLangType) == Yii::app()->params['ENGLISH']) {
                $globalCity = Yii::app()->params['ENG'];
            }
        }
        $city = Yii::app()->user->getState("cityHeader");
        $cityHeader = (!empty($city) ? $city : $globalCity);
        if (!empty(Yii::app()->request->isAjaxRequest)) {
            $getDetail = $model->findStoreDetailViaCity(array('city' => $cityHeader, 'preview' => $preview), $this->cookieLangType);
            ?>
            <h3><?php echo $city; ?></h3>
            <?php
            if (isset($getDetail) && !empty($getDetail)) {
                foreach ($getDetail as $value) {
                    ?>
                    <div class="results"> 

                    <?php echo $value['address'] ?>  
                        <div class="location_image"><img src="../images/location.png" height="34" width="24" /></div>
                    </div> 
                    <?php
                }
            }exit();
        } else {
            $getDetail = $model->findStoreDetailViaCity(array('city' => $cityHeader, 'preview' => $preview), $this->cookieLangType);
        }


        $getCityList = $model->getCityName($this->cookieLangType);



        $this->render('store', array('getCityList' => $getCityList, 'getDetail' => $getDetail, 'cityHeader' => $cityHeader));
    }

    public function actionCategory() {
        $last_cat_ID = '';
        $totalCount = '';
        $getCategoryDetail = array();
        $ID = '';
        if ($this->sInterFaceType == 'web') {
            $getCount = Category::model()->findAllByAttributes(array('status' => '1'));
            $totalCount = count($getCount);
        }
        $preview = '';
        if ((isset(Yii::app()->request->cookies['previewAdmin']->value) && !empty(Yii::app()->request->cookies['previewAdmin']->value))) {
            $preview = 'preview';
        }

        if (!empty(Yii::app()->request->isAjaxRequest)) {

            $limit = Yii::app()->getRequest()->getParam('limit');
            $offset = Yii::app()->getRequest()->getParam('offset');
            $getCategoryDetail = $this->categoryModel->getCategoryDeatil(array('limit' => $limit, 'offset' => $offset, 'sInterFaceType' => $this->sInterFaceType,'preview'=>$preview), $this->cookieLangType);
            if (!empty($getCategoryDetail)) {
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

                    <ul class="single_product  <?php echo $class; ?>">
                        <li><h3 style="font-family:arial;"><?php echo $val['category_titleE']; ?></h3></li>
                        <li><h4 style="font-family:黑体;"><?php echo $val['category_titleC']; ?></h4></li>
                        <li>
                    <?php echo CHtml::link('<img src="../images/upload/category/' . $val['category_image'] . '"/>', array($this->langType . '/collections/' . $val['categorySlug'])); ?>
                        </li>

                        <!--  <li class="more"> <?php
                    if (strtolower($this->cookieLangType) == 'english') {
                        echo CHtml::link('More', array($this->langType . '/collections/' . $val['categorySlug']));
                    } else if (strtolower($this->cookieLangType) == 'chinese') {
                        echo CHtml::link('立即探索', array($this->langType . '/collections/' . $val['categorySlug']));
                    }
                    ?>
                          </li>-->
                    </ul>
                    <?php
                }
            } exit();
        } else {
            $getCategoryDetail = $this->categoryModel->getCategoryDeatil(array('last_cat_ID' => $last_cat_ID, 'sInterFaceType' => $this->sInterFaceType,'preview'=>$preview), $this->cookieLangType);
        }


        $this->render('category', array('getCategoryDetail' => $getCategoryDetail, 'last_cat_ID' => $last_cat_ID, 'totalCount' => $totalCount, 'sInterFaceType' => $this->sInterFaceType));
    }

    public function actionProduct() {
        $preview = '';
        if (isset($_GET['preview']) || (isset(Yii::app()->request->cookies['previewAdmin']->value) && !empty(Yii::app()->request->cookies['previewAdmin']->value))) {
            $preview = 'preview';
        }
        $categorySlug = Yii::app()->getRequest()->getParam('categorySlug');
        $categoryDetail = Category::model()->findByAttributes(array('category_slug' => $categorySlug));
        $category_id = ((!empty($categoryDetail->id)) ? $categoryDetail->id : '');
        if (!Yii::app()->user->isGuest && Yii::app()->user->aUserData['roleType'] == 'A') {
            $getCount = Product::model()->findAllByAttributes(array('category_id' => $category_id, 'status' => '1'));
        } else {
            $getCount = Product::model()->findAllByAttributes(array('category_id' => $category_id, 'status' => '1', 'show_status' => 'P'));
        }
        $totalCount = count($getCount);
        if (strtolower($this->cookieLangType) == Yii::app()->params['CHINESE']) {
            $categoryName = ((!empty($categoryDetail->category_title_chi)) ? $categoryDetail->category_title_chi : '');
        } else if (strtolower($this->cookieLangType) == Yii::app()->params['ENGLISH']) {
            $categoryName = ((!empty($categoryDetail->category_title_eng)) ? $categoryDetail->category_title_eng : '');
        }
        if (!empty(Yii::app()->request->isAjaxRequest)) {
            $limit = Yii::app()->getRequest()->getParam('limit');
            $offset = Yii::app()->getRequest()->getParam('offset');
            $category_id = Yii::app()->getRequest()->getParam('cat');
            $categoryDetail = Category::model()->findByAttributes(array('id' => $category_id));
            $category_slug = ((!empty($categoryDetail->category_slug)) ? $categoryDetail->category_slug : '');
            $getProductListing = $this->productModel->getProductListing(array('limit' => $limit, 'offset' => $offset, 'category_id' => $category_id, 'sInterFaceType' => $this->sInterFaceType, 'preview' => $preview), $this->cookieLangType);
            if (!empty($getProductListing)) {
                $i = 1;
                foreach ($getProductListing as $val) {
                    ?>
                    <ul class="single_product">
                        <li>
                    <?php echo CHtml::link('<img src="../../images/upload/product/' . $val['product_image'] . '"/>', array($this->langType . '/collections/' . $category_slug . '/' . $val['model'])); ?>
                            <div class="clearfix"></div>
                            <span class="product_code"><?php echo $val['model']; ?></span>
                        </li>
                    </ul>
                    <?php
                    if ($i % 3 == 0) {
                        ?> <div class="clearfix"></div>
                        <?php
                    }$i++;
                }
            }exit();
        } else {
            $getProductListing = $this->productModel->getProductListing(array('category_id' => $category_id, 'sInterFaceType' => $this->sInterFaceType, 'preview' => $preview), $this->cookieLangType);
        }

        $this->render('product', array('totalCount' => $totalCount, 'getProductListing' => $getProductListing, 'category_id' => $category_id, 'categorySlug' => $categorySlug, 'categoryName' => $categoryName, 'sInterFaceType' => $this->sInterFaceType));
    }

    public function actionProductdetail() {
        $productModel = Yii::app()->getRequest()->getParam('model');
        $productDetail = Product::model()->findByAttributes(array('product_model_eng' => $productModel));
        $categoryDetail = Category::model()->findByAttributes(array('id' => $productDetail->category_id));
        $product_id = ((!empty($productDetail->id)) ? $productDetail->id : '');
        if (strtolower($this->cookieLangType) == Yii::app()->params['CHINESE']) {
            $categoryName = ((!empty($categoryDetail->category_title_chi)) ? $categoryDetail->category_title_chi : '');
        } else if (strtolower($this->cookieLangType) == Yii::app()->params['ENGLISH']) {
            $categoryName = ((!empty($categoryDetail->category_title_eng)) ? $categoryDetail->category_title_eng : '');
        }
        $getProductDetail = $this->productModel->getProductDetail(array('product_id' => $product_id), $this->cookieLangType);
//        $getProductListingCategoryWise = $this->productModel->getProductListingCategoryWise(array('category_id' => $getProductDetail['category_id']), $this->cookieLangType);
        $getProductListingCategoryWise = $this->productModel->getProductListingCategoryWise(array('product_id' => $product_id, 'category_id' => $productDetail->category_id), $this->cookieLangType);

        $this->render('productdetail', array('getProductDetail' => $getProductDetail, 'categoryName' => $categoryName, 'getProductListingCategoryWise' => $getProductListingCategoryWise));
    }

    public function actionContactus() {
        $slug = 'contact-us';
        $getContent = $this->contentModel->getContent(array('slug' => $slug), $this->cookieLangType);
        if (!empty(Yii::app()->request->isAjaxRequest)) {
            $postData = $_POST;
            echo $insertData = $this->contactModel->insertContactData($postData, $this->cookieLangType);
            return $insertData;
            die;
        }
        $this->render('contactus', array('getContent' => $getContent));
    }

    public function actionNews() {
        $preview ='';
        if (isset($_GET['preview']) || (isset(Yii::app()->request->cookies['previewAdmin']->value) && !empty(Yii::app()->request->cookies['previewAdmin']->value))) {
            $preview = 'preview';
        }

        if (!empty(Yii::app()->request->isAjaxRequest)) {
            $year = Yii::app()->getRequest()->getParam('year');
            $getNewsList = $this->newsModel->getNewsList(array('year' => $year,'preview'=>$preview), $this->cookieLangType);
            if (!empty($getNewsList)) {
                foreach ($getNewsList as $value) {
                    ?>
                    <div class="news" id ="news">
                        <div class="news-img">
                            <a href="<?php echo Yii::app()->request->baseUrl; ?>/<?php echo $this->langType; ?>/home/newsdetail/<?php echo $value['news_id']; ?>">  <img src="<?php echo Yii::app()->request->baseUrl; ?>/images/upload/news/<?php echo $value['image']; ?>"/></a>
                        </div>
                        <div class="news-details">
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
                            <div class="news-title"><?php echo CHtml::link($value['news_header'], array($this->langType . '/home/newsdetail/' . $value['news_id']), array('news_id' => $value['news_id'])); ?> </div>
                        </div><div class="clr"></div>
                    </div>

                    <hr class="grey">
                    <?php
                }
            } else {
                if (strtolower($this->cookieLangType) == 'english') {
                    ?> 
                    <div class="no-product" ><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/en-news.jpg" title="" alt="" /></div>
                <?php } else if (strtolower($this->cookieLangType) == 'chinese') {
                    ?>
                    <div class="no-product" ><img src="<?php echo Yii::app()->request->baseUrl; ?>/images/cn-news.jpg" title="" alt="" /></div>
                    <?php
                }
            }

            exit();
        } else {
            $getNewsList = $this->newsModel->getNewsList(array('preview'=>$preview), $this->cookieLangType);
            $this->render('news', array('getNewsList' => $getNewsList));
        }
    }

    public function actionNewsdetail() {
        $news_id = Yii::app()->getRequest()->getParam('news_id');
        $getNewsDetail = $this->newsModel->getNewsDetail(array('news_id' => $news_id), $this->cookieLangType);

        $this->render('newsdetail', array('getNewsDetail' => $getNewsDetail));
    }

    public function actionLegal() {
        $this->render('legal');
    }

    public function actionMaintenance() {
        $this->render('maintenance');
    }

    public function actionCustomerservice() {
        $this->render('customerservice');
    }

    public function actionBrandhistory() {
        $this->render('brandhistory');
    }

}
