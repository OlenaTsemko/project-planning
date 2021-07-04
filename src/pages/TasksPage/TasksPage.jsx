import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import TaskList from 'components/TaskList';
import Modal from 'components/Modal';
import CreateTaskForm from 'components/CreateTaskForm';
import SideBar from 'components/SideBar';
import CreateSprint from 'components/CreateSprint';

import { getTasks } from 'redux/tasks/tasks-selectors';
import { getSprints, getCurrentSprint } from 'redux/sprints/sprints-selectors';
import sprintsOperations from 'redux/sprints/sprints-operations';
import tasksOperations from 'redux/tasks/tasks-operations';

import styles from './TasksPage.module.scss';

const TasksPage = props => {
  // const [tasks, setTasks] = useState([]);
  const [sprintName, setSprintName] = useState('');
  const [showModalCreateTask, setShowModalCreateTask] = useState(false);
  const [showModalCreateSprint, setShowModalCreateSprint] = useState(false);
  const [showModalAnalytics, setShowModalAnalytics] = useState(false);
  const [showChangeTitleForm, setShowChangeTitleForm] = useState(false);

  const { projectId, sprintId } = props.match.params;
  console.log('projectId', projectId);
  console.log('sprintId', sprintId);

  const dispatch = useDispatch();

  const currentSprint = useSelector(getCurrentSprint);
  const sprints = useSelector(getSprints);
  const tasks = useSelector(getTasks);

  useEffect(() => {
    dispatch(sprintsOperations.getSprintById(projectId, sprintId));
    dispatch(tasksOperations.getAllTasks(sprintId));
  }, [dispatch, projectId, sprintId]);

  const handleCloseModal = () => {
    setShowModalCreateTask(false);
    setShowModalCreateSprint(false);
    setShowModalAnalytics(false);
  };
  const openModalCreateSprint = () => {
    setShowModalCreateSprint(true);
  };
  const openModalCreateTask = () => {
    setShowModalCreateTask(true);
  };
  const openModalAnalytics = () => {
    setShowModalAnalytics(true);
  };

  const handleClickBtnChange = () => {
    setSprintName(currentSprint?.name);
    setShowChangeTitleForm(!showChangeTitleForm);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (currentSprint.name !== sprintName || sprintName !== '') {
      dispatch(
        sprintsOperations.updateSprint(projectId, sprintId, {
          name: sprintName,
        }),
      );
    }

    setShowChangeTitleForm(!showChangeTitleForm);
  };

  const handleInputChangeTitle = e => {
    setSprintName(e.target.value);
  };

  useEffect(() => {
    //TODO fetch tasks and SprintName

    setSprintName('This is name of sprint');
  }, [sprintId]);

  return (
    <>
      <main>
        <aside>
          <SideBar>
            <Link
              className={styles.linkToBack}
              to={{
                pathname: `/projects/${projectId}`,
              }}
            >
              Show sprints
            </Link>
            <div className={styles.navSprintsList}>
              <ul>
                {sprints.map(sprint => (
                  <li key={sprint.id}>
                    <NavLink
                      className={styles.linkToSprint}
                      activeClassName={styles.linkToSprintActive}
                      to={{
                        pathname: `/projects/${projectId}/${sprint.id}`,
                      }}
                    >
                      <div className={styles.sprintsWrap}>
                        <span />
                        <h3>{sprint.name}</h3>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/*Кнопка создания спринта в сайдбаре */}
              <button
                type="button"
                className={styles.btnCreateSprint}
                onClick={openModalCreateSprint}
              ></button>
            </div>
          </SideBar>
        </aside>

        <div className={styles.sprintContent}>
          <div className={styles.sprintDate}>
            {/*TODO Пагинация */}
            <p>current date</p>
          </div>

          <div className={styles.sprintHeader}>
            <h1
              className={
                showChangeTitleForm ? styles.titleDisable : styles.title
              }
            >
              {currentSprint?.name}
            </h1>

            <form
              onSubmit={handleSubmit}
              className={
                showChangeTitleForm
                  ? styles.changeTitleFormActive
                  : styles.changeTitleForm
              }
            >
              <input
                className={styles.inputChangeTitle}
                value={sprintName}
                onChange={handleInputChangeTitle}
              ></input>
              {/* Кнопка сoхранения нового названия */}
              <button type="submit" className={styles.btnSaveChange}>
                {' '}
              </button>
            </form>

            {/* Кнопка открытия формы для изменения названия */}
            <button
              type="button"
              className={
                showChangeTitleForm ? styles.btnChangeDisable : styles.btnChange
              }
              onClick={handleClickBtnChange}
            >
              {' '}
            </button>

            {/* Кнопка открытия модалки создания новой задачи */}
            <button
              type="button"
              className={styles.btnCreateTask}
              onClick={openModalCreateTask}
            >
              {' '}
            </button>
          </div>

          {/* Кнопка открытия модалки с аналитикой */}
          {tasks.length > 2 && (
            <button
              type="button"
              className={styles.btnOpenAnalytics}
              onClick={openModalAnalytics}
            >
              {' '}
            </button>
          )}

          <TaskList tasks={tasks} />
        </div>
      </main>

      {showModalCreateTask && (
        <Modal onCloseModal={handleCloseModal}>
          <CreateTaskForm onClickCancel={handleCloseModal} />
        </Modal>
      )}
      {showModalCreateSprint && (
        <Modal onCloseModal={handleCloseModal}>
          <CreateSprint
            projectId={projectId}
            sprintId={sprintId}
            onClickCancel={handleCloseModal}
          />
        </Modal>
      )}
      {showModalAnalytics && (
        <h3>Analytics</h3>
        // TODO Modal
      )}
    </>
  );
};

export default TasksPage;
