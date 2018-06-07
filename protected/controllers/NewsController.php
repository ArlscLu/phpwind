<?php

class NewsController extends ControllerChild {

    /**
     * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
     * using two-column layout. See 'protected/views/layouts/column2.php'.
     */
    public $layout = 'main_layout';

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
    public function accessRules() {
        if (Yii::app()->user->aUserData['roleType'] == 'A') {
            $arr = array('admin', 'create', 'update', 'delete', 'status', 'index', 'view', 'saveordervalue', 'updategridorder', 'showstatus', 'version', 'rollback', 'deleteversion', 'viewversion');    // give all access to admin
        }

        return array(
            array('allow', // allow all users to perform 'index' and 'view' actions
                'actions' => $arr,
                'users' => array('@'),
            ),
            array('deny', // deny all users
                'users' => array('*'),
            ),
        );
    }

    /**
     * Displays a particular model.
     * @param integer $id the ID of the model to be displayed
     */
    public function actionView($id) {
        $this->render('view', array(
            'model' => $this->loadModel($id),
        ));
    }

    /**
     * Creates a new model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     */
    public function actionCreate() {
        $model = new News;
        $modelVersion = new Newsversion;
        $path = Yii::app()->basePath . '/../images/upload/news/';
        $smallpath = Yii::app()->basePath . '/../images/upload/resizenews/';
        $rnd = time();

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['News'])) {
            /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
            $modelVersion->attributes = $_POST['News'];
            $modelVersion->created_date = new CDbExpression('NOW()');
            $modelVersion->updated_date = new CDbExpression('NOW()');
            /* ------------------------------ End Versin Model Save data ------------------------------------------ */
            $model->attributes = $_POST['News'];
            if (!empty($_POST['News']['news_long_desc_C'])) {
                $sDescDataC = $_POST['News']['news_long_desc_C'];
            } else {
                $sDescDataC = '';
            }
            if (!empty($_POST['News']['news_long_desc_E'])) {
                $sDescDataE = $_POST['News']['news_long_desc_E'];
            } else {
                $sDescDataE = '';
            }
            $model->news_long_desc_C = $sDescDataC;
            $model->news_long_desc_E = $sDescDataE;
            $model->show_status = 'U';
            $model->status = 1;
            $model->created_date = new CDbExpression('NOW()');
            $model->updated_date = new CDbExpression('NOW()');
            $modelVersion->news_long_desc_C = $sDescDataC;
            $modelVersion->news_long_desc_E = $sDescDataE;

            if (@!empty($_FILES['News']['name']['news_image'])) {

                $percent = 0.5;
                $imageUploadFileE = CUploadedFile::getInstance($model, 'news_image');
                $fileNameE = "{$rnd}-{$imageUploadFileE}";
                $model->news_image = $fileNameE;
                $modelVersion->news_image = $fileNameE;
                $model->news_resize_image = $fileNameE;
                    $modelVersion->news_resize_image =$fileNameE;
                if ($model->save()) {
                    $imageUploadFileE->saveAs($path . $fileNameE);
                    $filename = stripslashes($_FILES['News']['name']['news_image']);
                    $extension = $this->getExtension($filename);
                    if ($extension == "jpg" || $extension == "jpeg") {
                        $source = imagecreatefromjpeg($path . $fileNameE);
                    } else if ($extension == "png") {
                        $source = imagecreatefrompng($path . $fileNameE);
                    } else {
                        $source = imagecreatefromgif($path . $fileNameE);
                    }
                    list($width, $height) = getimagesize($path . $fileNameE);
                    $newwidth = $width * $percent;
                    $newheight = $height * $percent;
                    $thumb = imagecreatetruecolor($newwidth, $newheight);
                    imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
                    if ($extension == "jpg" || $extension == "jpeg") {
                        $resizeFileName = time() . '.jpg';
                        imagejpeg($thumb, $smallpath . $resizeFileName);
                    } else if ($extension == "png") {
                        $resizeFileName = time() . '.png';
                        imagepng($thumb, $smallpath . $resizeFileName);
                    } else {
                        $resizeFileName = time() . '.gif';
                        imagegif($thumb, $smallpath . $resizeFileName);
                    }
//                    $model->news_resize_image = $resizeFileName;
//                    $modelVersion->news_resize_image = $resizeFileName;
                    
                    $model->save();
                    /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
                    $modelVersion->news_id = $model->id;
                    $modelVersion->insert(true);
                    /* ------------------------------ End Versin Model Save data ------------------------------------------ */
                    Yii::app()->user->setFlash('notice', base64_encode(Yii::t('translation', "News has been successfully created.")));
                    exit();
                }
            }
        }

        $this->render('create', array(
            'model' => $model,
        ));
    }

    /**
     * Updates a particular model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id the ID of the model to be updated
     */
    public function actionUpdate($id) {
        $model = $this->loadModel($id);
        $modelVersion = new Newsversion;
        $modelVersion->attributes = $model->attributes;
        $path = Yii::app()->basePath . '/../images/upload/news/';
        $smallpath = Yii::app()->basePath . '/../images/upload/resizenews/';
        $rnd = time();

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['News'])) {
            /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
            $modelVersion->created_date = new CDbExpression('NOW()');
            $modelVersion->updated_date = new CDbExpression('NOW()');
            $modelVersion->news_long_desc_C = $model->news_long_desc_C;
            $modelVersion->news_long_desc_E = $model->news_long_desc_E;
            /* ------------------------------ End Versin Model Save data ------------------------------------------ */
            $_POST['News']['news_image'] = $model->news_image;
            $model->attributes = $_POST['News'];
            if (!empty($_POST['News']['news_long_desc_C'])) {
                $sDescDataC = $_POST['News']['news_long_desc_C'];
            } else {
                $sDescDataC = '';
            }
            if (!empty($_POST['News']['news_long_desc_E'])) {
                $sDescDataE = $_POST['News']['news_long_desc_E'];
            } else {
                $sDescDataE = '';
            }
            $model->show_status = 'U';
            $model->news_long_desc_C = $sDescDataC;
            $model->news_long_desc_E = $sDescDataE;

            if (@!empty($_FILES['News']['name']['news_image'])) {

                $percent = 0.5;
                $imageUploadFileE = CUploadedFile::getInstance($model, 'news_image');
                $fileNameE = "{$rnd}-{$imageUploadFileE}";
                $model->news_image = $fileNameE;

                if ($model->save()) {
                    $imageUploadFileE->saveAs($path . $fileNameE);
                    $filename = stripslashes($_FILES['News']['name']['news_image']);
                    $extension = $this->getExtension($filename);
                    if ($extension == "jpg" || $extension == "jpeg") {
                        $source = imagecreatefromjpeg($path . $fileNameE);
                    } else if ($extension == "png") {
                        $source = imagecreatefrompng($path . $fileNameE);
                    } else {
                        $source = imagecreatefromgif($path . $fileNameE);
                    }
                    list($width, $height) = getimagesize($path . $fileNameE);
                    $newwidth = $width * $percent;
                    $newheight = $height * $percent;
                    $thumb = imagecreatetruecolor($newwidth, $newheight);
                    imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
                    if ($extension == "jpg" || $extension == "jpeg") {
                        $resizeFileName = time() . '.jpg';
                        imagejpeg($thumb, $smallpath . $resizeFileName);
                    } else if ($extension == "png") {
                        $resizeFileName = time() . '.png';
                        imagepng($thumb, $smallpath . $resizeFileName);
                    } else {
                        $resizeFileName = time() . '.gif';
                        imagegif($thumb, $smallpath . $resizeFileName);
                    }
                    $model->news_resize_image = $resizeFileName;
                }
            }
            $model->save();
            /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
            $modelVersion->news_id = $model->id;

            $modelVersion->insert(true);
            /* ------------------------------ End Versin Model Save data ------------------------------------------ */
            Yii::app()->user->setFlash('notice', base64_encode(Yii::t('translation', "News has been successfully updated.")));
            exit();
        }


        $this->render('update', array(
            'model' => $model,
        ));
    }

    /**
     * Deletes a particular model.
     * If deletion is successful, the browser will be redirected to the 'admin' page.
     * @param integer $id the ID of the model to be deleted
     */
    public function actionDelete($id) {


        try {
            $sNewsImage = News::model()->findByAttributes(array('id' => $id));
            @unlink(ROOTPATH . '/images/upload/news/' . $sNewsImage->news_image);
            @unlink(ROOTPATH . '/images/upload/resizenews/' . $sNewsImage->news_resize_image);
            $this->loadModel($id)->delete();
        } catch (Exception $e) {
            echo $e->getMessage();
            die;
        }

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
    }

    /**
     * Lists all models.
     */
    public function actionIndex() {
        $dataProvider = new CActiveDataProvider('News');
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

    /**
     * Manages all models.
     */
    public function actionAdmin() {
        $model = new News('search');
        $model->unsetAttributes();  // clear any default values
        if (isset($_GET['News']))
            $model->attributes = $_GET['News'];

        $this->render('admin', array(
            'model' => $model,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id the ID of the model to be loaded
     * @return News the loaded model
     * @throws CHttpException
     */
    public function loadModel($id) {
        $model = News::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /**
     * Performs the AJAX validation.
     * @param News $model the model to be validated
     */
    protected function performAjaxValidation($model) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'news-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
    }

    function getExtension($str) {

        $i = strrpos($str, ".");
        if (!$i) {
            return "";
        }

        $l = strlen($str) - $i;
        $ext = substr($str, $i + 1, $l);
        return $ext;
    }

    public function actionStatus($id, $status) {

        News::model()->updateByPk($id, array('status' => $status));
    }

    /* ----------------------------------------- Start Versioning Changes ------------------------------------- */

    public function actionVersion($id) {
        $model = new Newsversion('search');
        $model->unsetAttributes();
        if (isset($_GET['Version']))
            $model->attributes = $_GET['Version'];

        $this->render('version', array(
            'model' => $model, 'id' => $id
        ));
    }

    public function actionRollback($id, $bid) {
        $modelVersion = Newsversion::model()->findByPk($id);
        $modelBanner = News::model()->findByPk($bid);
        $arr = $modelVersion->attributes;
        $arr['id'] = $modelVersion->news_id;
        News::model()->updateByPk($bid, $arr);
        /* ------------------------------ Start Versin Model Save data ------------------------------------------ */
        $version = new Newsversion;
        $version->attributes = $modelBanner->attributes;
        $version->created_date = new CDbExpression('NOW()');
        $version->updated_date = new CDbExpression('NOW()');
        $version->news_id = $bid;
        $version->news_image = $modelBanner->news_image;
        $version->news_resize_image = $modelBanner->news_resize_image;
        $version->news_long_desc_E = $modelBanner->news_long_desc_E;
        $version->news_long_desc_C = $modelBanner->news_long_desc_C;
        $version->insert(true);
        /* ------------------------------ End Versin Model Save data ------------------------------------------ */
    }

    public function actionViewversion($id) {
        $this->render('viewversion', array(
            'model' => $this->loadModelVersion($id),
        ));
    }

    public function actionDeleteversion($id) {

        $this->loadModelVersion($id)->delete();
        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
    }

    public function actionShowstatus($id, $showstatus) {

        News::model()->updateByPk($id, array('show_status' => $showstatus));
    }

    public function loadModelVersion($id) {
        $model = Newsversion::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /* ----------------------------------------- End Versioning Changes ------------------------------------- */
}
