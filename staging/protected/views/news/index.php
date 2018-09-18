<?php
/* @var $this NewsController */
/* @var $dataProvider CActiveDataProvider */

$this->breadcrumbs=array(
	'Brand Culture',
);

$this->menu=array(
	array('label'=>'Create Brand Culture', 'url'=>array('create')),
	array('label'=>'Manage Brand Culture', 'url'=>array('admin')),
);
?>

<h1>Brand Culture</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>
