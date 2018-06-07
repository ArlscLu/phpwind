<?php

class SettingController extends Controller {

    /**
     * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
     * using two-column layout. See 'protected/views/layouts/column2.php'.
     */
    public $layout = 'main_layout';

    public function accessRules() {
        if (Yii::app()->user->aUserData['roleType'] == 'A') {
            $arr = array('admin', 'create', 'update', 'delete', 'status', 'index', 'view', 'changepassword');    // give all access to admin
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
        $model = new Setting;

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['Setting'])) {
            $model->attributes = $_POST['Setting'];
            if ($model->save())
                $this->redirect(array('admin'));
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

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['Setting'])) {
            $model->attributes = $_POST['Setting'];
            if ($model->save())
                $this->redirect(array('admin'));
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
        $this->loadModel($id)->delete();

        // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
        if (!isset($_GET['ajax']))
            $this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
    }

    /**
     * Lists all models.
     */
    public function actionIndex() {
        $dataProvider = new CActiveDataProvider('Setting');
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

    /**
     * Manages all models.
     */
    public function actionAdmin() {
        $model = new Setting('search');
        $model->unsetAttributes();  // clear any default values
        if (isset($_GET['Setting']))
            $model->attributes = $_GET['Setting'];

        $this->render('admin', array(
            'model' => $model,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer $id the ID of the model to be loaded
     * @return Setting the loaded model
     * @throws CHttpException
     */
    public function loadModel($id) {
        $model = Setting::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }
    public function loadModelUser($id) {
        $modelUser = User::model()->findByPk($id);
        if ($modelUser === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $modelUser;
    }

    /**
     * Performs the AJAX validation.
     * @param Setting $model the model to be validated
     */
    protected function performAjaxValidation($model) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'setting-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
    }

    public function actionStatus($id, $status) {

        Setting::model()->updateByPk($id, array('status' => $status));
    }

    public function actionChangepassword() {
        $id = Yii::app()->user->id;
        $model = $this->loadModelUser($id);
        if (isset($_REQUEST['old_password'])) {
            $checkExist = User::model()->checkPassword($_REQUEST['old_password'], $id);
            if ($checkExist == 1) {


                if (isset($_REQUEST['password']) && isset($_REQUEST['conf_password']) && $_REQUEST['password'] == $_REQUEST['conf_password'] && $_REQUEST['conf_password'] != '' && $_REQUEST['password'] != '') {
                    if (strlen($_REQUEST['password']) < 6 || strlen($_REQUEST['conf_password']) < 6) {
                        Yii::app()->user->setFlash('red', base64_encode(Yii::t('translation', "Password and Confirm Password length should be minimum of 6 characters.")));
                        $this->redirect(array('changepassword'));
                    }
                    if (strlen($_REQUEST['password']) > 20 || strlen($_REQUEST['conf_password']) > 20) {
                        Yii::app()->user->setFlash('red', base64_encode(Yii::t('translation', "Password and Confirm Password length should be maximum of 20 characters.")));
                        $this->redirect(array('changepassword'));
                    }


                    $newPassword = md5($_REQUEST['password']);


                    $model->password = $newPassword;
                    $passexist = User::model()->checkPasswordExist($newPassword, $id);
                    if ($passexist == 1) {
                        Yii::app()->user->setFlash('red', base64_encode(Yii::t('translation', "New Password Should be different than old password.")));
                        $this->redirect(array('setting/changepassword'));
                    } else {
                        try {
                            if ($model->update(true)) {
                                Yii::app()->user->setFlash('notice', base64_encode(Yii::t('translation', "Password Successfully updated.")));
                                $this->redirect(array('banner/admin'));
                            }
                        } catch (Exception $e) {
                            echo $e->getMessage();
                            die;
                        }
                    }
                } else {
                    Yii::app()->user->setFlash('red', base64_encode(Yii::t('translation', "Password and Confirm Password are mandatory and should be of same value.")));
                    $this->redirect(array('setting/changepassword'));
                }
            } else {
                Yii::app()->user->setFlash('red', base64_encode(Yii::t('translation', "Old password does not match, please enter correct passowrd.")));
                  $this->redirect(array('setting/changepassword'));
            }
        }
        $this->render('changepassword');
    }

}
