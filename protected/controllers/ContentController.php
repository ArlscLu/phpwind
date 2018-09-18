<?php

class ContentController extends ControllerChild {

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
            $arr = array('admin', 'create', 'update', 'delete', 'status', 'index', 'view', 'showstatus', 'version', 'rollback', 'deleteversion', 'viewversion');    // give all access to admin
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
        $model = new Content;

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['Content'])) {

            $model->attributes = $_POST['Content'];
           $model->content_title_E_A = $model->content_title_E = (!empty($_POST['content_title_E']) ? $_POST['content_title_E'] : '');
            $model->content_title_C_A =$model->content_title_C = (!empty($_POST['content_title_C']) ? $_POST['content_title_C'] : '');
            $model->content_E_A = $model->content_E = (!empty($_POST['content_E']) ? $_POST['content_E'] : '');
            $model->content_C_A = $model->content_C = (!empty($_POST['content_C']) ? $_POST['content_C'] : '');
            $model->slug = preg_replace('/\s+/', '-', strtolower($_POST['content_title_E']));
            $model->slug_A = preg_replace('/\s+/', '-', strtolower($_POST['content_title_E']));
            
            $model->created_date = new CDbExpression('NOW()');
            $model->updated_date = new CDbExpression('NOW()');
            if ($model->save()) {
                Yii::app()->user->setFlash('notice', base64_encode(Yii::t('translation', "Content has been successfully created.")));
                exit();
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
        $modelContent = $this->loadModel($id);




        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['Content'])) {
//            $model->content_title_E = (!empty($_POST['content_title_E']) ? $_POST['content_title_E'] : '');
//            $model->content_title_C = (!empty($_POST['content_title_C']) ? $_POST['content_title_C'] : '');
//            $model->content_E = (!empty($_POST['content_E']) ? $_POST['content_E'] : '');
//            $model->content_C = (!empty($_POST['content_C']) ? $_POST['content_C'] : '');

            $modelContent->content_title_E_A = (!empty($_POST['content_title_E']) ? $_POST['content_title_E'] : '');
            $modelContent->content_title_C_A = (!empty($_POST['content_title_C']) ? $_POST['content_title_C'] : '');
            $modelContent->content_E_A = (!empty($_POST['content_E']) ? $_POST['content_E'] : '');
            $modelContent->content_C_A = (!empty($_POST['content_C']) ? $_POST['content_C'] : '');
            $modelContent->slug_A = preg_replace('/\s+/', '-', strtolower($_POST['content_title_E']));
            $modelContent->show_status = 'U';
            $modelContent->updated_date = new CDbExpression('NOW()');
            if ($modelContent->save()) {
                Yii::app()->user->setFlash('notice', base64_encode(Yii::t('translation', "Content has been successfully updated.")));
                exit();
            }
        }

        $this->render('update', array(
            'model' => $modelContent,
        ));
    }

    /**
     * Deletes a particular model.
     * If deletion is successful, the browser will be redirected to the 'admin' page.
     * @param integer $id the ID of the model to be deleted
     */
    public function actionDelete($id) {
        $this->loadModel($id)->delete();

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
    }

    /**
     * Lists all models.
     */
    public function actionIndex() {
        $dataProvider = new CActiveDataProvider('Content');
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

    /**
     * Manages all models.
     */
    public function actionAdmin() {
        $model = new Content('search');
        $model->unsetAttributes();  // clear any default values
        if (isset($_GET['Content']))
            $model->attributes = $_GET['Content'];

        $this->render('admin', array(
            'model' => $model,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id the ID of the model to be loaded
     * @return Content the loaded model
     * @throws CHttpException
     */
    public function loadModel($id) {
        $model = Content::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /**
     * Performs the AJAX validation.
     * @param Content $model the model to be validated
     */
    protected function performAjaxValidation($model) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'content-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
    }

    public function actionStatus($id, $status) {

        Content::model()->updateByPk($id, array('status' => $status));
    }

    /* ----------------------------------------- Start Versioning Changes ------------------------------------- */

    public function actionVersion($id) {
        $model = new Content('searchV');
        $model->unsetAttributes();
        if (isset($_GET['Version']))
            $model->attributes = $_GET['Version'];

        $this->render('version', array(
            'model' => $model, 'id' => $id
        ));
    }

    public function actionRollback($id, $bid) {
        $modelVersion = Content::model()->findByPk($id);
        $modelBanner = Category::model()->findByPk($bid);
        $arr = $modelVersion->attributes;
        $arr['id'] = $modelVersion->category_id;
        $arr['order_by'] = $modelBanner->order_by;
        Category::model()->updateByPk($bid, $arr);
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
        $modelContent = Content ::model()->findByPk($id);
        $modelContent->content_title_E = $modelContent->content_title_E_A;
        $modelContent->content_title_C = $modelContent->content_title_C_A;
        $modelContent->content_E = $modelContent->content_E_A;
        $modelContent->content_C = $modelContent->content_C_A;
        $modelContent->slug = $modelContent->slug_A;
        $modelContent->show_status = 'P';
        $modelContent->updated_date = new CDbExpression('NOW()');
//        Content::model()->updateByPk($id, $modelContent);
        $modelContent->save();
    }

    public function loadModelVersion($id) {
        $model = Content::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /* ----------------------------------------- End Versioning Changes ------------------------------------- */
}
