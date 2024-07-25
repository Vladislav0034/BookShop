const taskRouter = require('express').Router();
const sharp = require('sharp');
const fs = require('fs/promises');
const { Task, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

taskRouter.route('/').get(async (req, res) => {
  try {
    const posts = await Task.findAll();
    res.json(posts);
  } catch (err) {
    res.status(500).send(err.message); // гет запрос для неавторизированного пользователя
  }
});


 /* taskRouter.route('/')
  .post(async (req, res) => {
    try {
      const { name, description, userId, status, deadlines, image } = req.body;
      // Создание нового задания
      const post = await Task.create({
        name: name, 
        description: description,
        userId: userId, // Пользователь ID теперь берется из тела запроса
        status: status,
        deadlines: deadlines,
        image: image,
      });
      // Поиск снова для получения сопутствующих данных о пользователе
      const plainX = await Task.findOne({
        where: { id: post.id },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });
      res.json(plainX);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }); //добавление задачи для не авторизированного пользователя


taskRouter.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  if (Number.isNaN(+id)) {
    return res.status(400).json({ message: 'Id must be a number' });
  }

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}); //удаление для неавторизированного пользователя


taskRouter.route('/:id').patch(async (req, res) => {
  const { id } = req.params;
  const { name, description, deadlines, status, image } = req.body;

  if (Number.isNaN(+id)) {
    return res.status(400).json({ message: 'Id must be a number' });
  }

  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Обновление записи с новыми данными
    task.name = name ?? task.name;
    task.description = description ?? task.description;
    task.deadlines = deadlines ?? task.deadlines;
    task.status = status ?? task.status;
    task.image = image ?? task.image;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}); //редактирование для неавторизированного пользователя */


  /* taskRouter.route('/filter').get(async (req, res) => {
  try {
    const xs = await Task.findAll();
    res.json(xs);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

 taskRouter.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Task.findByPk(id);
    if (!post) {
      return res.status(404).send('Маршрут не найден');
    }
    res.json(post);
  } catch (err) {
    res.status(500).send(err.message); // выводит подрробно конкретный маршрут
  }
}); //подробно показывает задачу но пока нет модалки */

taskRouter
  .route('/')
  .get(verifyAccessToken, async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const xs = await Task.findAll({
        where: { userId },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });
      res.json(xs);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const post = await Task.create({
        name: req.body.name, // название колонки
        description: req.body.description,
        userId: res.locals.user.id,
        status: req.body.status,
        deadlines: req.body.deadlines,
        image: req.body.image,
      });

      const plainX = await Task.findOne({
        where: {
          id: post.id,
        },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });

      res.json(plainX);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });

taskRouter.route('/:id').delete(verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  if (Number.isNaN(+id)) {
    return res.status(400).json({ message: 'Id must be a number' });
  }

  try {
    const x = await Task.findByPk(req.params.id);
    if (!x) {
      return res.status(404).json({ message: 'X not found' });
    }
    if (x.userId !== res.locals.user.id) {
      return res.status(401).json({ message: 'Unable to complete' });
    }
    await x.destroy();
    res.json({ message: 'X deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

taskRouter.route('/:id').patch(verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const { name, description, deadlines, status, image } = req.body;

  if (Number.isNaN(+id)) {
    return res.status(400).json({ message: 'Id must be a number' });
  }

  try {
    const post = await Task.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (post.userId !== res.locals.user.id) {
      return res.status(401).json({ message: 'Unable to complete' });
    }

    // Обновление записи с новыми данными
    post.name = name ?? post.name;
    post.description = description ?? post.description;
    post.deadlines = deadlines ?? post.deadlines;
    post.status = status ?? post.status;
    post.image = image ?? post.image;
    

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}); 


module.exports = taskRouter;