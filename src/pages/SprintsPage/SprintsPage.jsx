import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';

import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { useMediaQuery } from '@material-ui/core';
import { refs } from './refs';
import { ReactComponent as EditIcon } from './svg/edit_icon.svg';
import { ReactComponent as AddGroupIcon } from './svg/add_group_icon.svg';
import { ReactComponent as CreateNewSprint } from './svg/plus_button_icon.svg';
import { ReactComponent as CreateNewProject } from './svg/plus_button_icon_two.svg';

import SideBar from 'components/SideBar';
import ShowProjects from 'components/ShowProjects';
import SideBarProjects from 'components/SideBarProjects';
import Modal from 'components/Modal';
import CreateSprint from 'components/CreateSprint';
import SprintList from 'components/SprintList';
import AddPeopleForm from 'components/AddPeopleForm';
import CreateProject from 'components/CreateProject';
import {
  getProjects,
  getCurrentProject,
} from 'redux/projects/projects-selectors';
import sprintsOperations from 'redux/sprints/sprints-operations';
import projectsOperations from 'redux/projects/projects-operations';

import s from './SprintsPage.module.scss';

const SprintsPage = props => {
  const [showModal, setShowModal] = useState(false);
  const [el, setEl] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');

  const { projectId } = props.match.params;
  const dispatch = useDispatch();

  const currentProject = useSelector(getCurrentProject);
  const projects = useSelector(getProjects);

  useEffect(() => {
    dispatch(projectsOperations.getProjectById(projectId));
    dispatch(sprintsOperations.getAllSprints(projectId));
  }, [dispatch, projectId]);

  // ----------- Modal -----------
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  const toggleModal = el => {
    setEl(el);
    setShowModal(!showModal);
  }; // -------- End Modal --------

  // ------- useMediaQuery -------
  const handleMaxWidth = width => {
    return `(max-width:${width}px) `;
  };
  const handleMinWidth = width => {
    return `(min-width:${width}px) `;
  };
  const tablet = useMediaQuery(handleMinWidth(refs.tablet));
  const tabletMax = useMediaQuery(handleMaxWidth(refs.tabletMax));
  const desktop = useMediaQuery(handleMinWidth(refs.desktop));
  // ----- End useMediaQuery -----

  const handleNameChange = event => setName(event.target.value);
  const editNameHandle = () => {
    setName(currentProject?.name);
    setShowInput(true);
  };

  const closeInputHandler = () => {
    if (currentProject.name !== name || name !== '') {
      dispatch(projectsOperations.updateProject(projectId, { name }));
    }
    setShowInput(false);
  };

  return (
    <>
      <main>
        <aside>
          <SideBar>
            <ShowProjects />
            <SideBarProjects projects={projects} />

            {tablet && (
              <div className={s.CreateNewProjectWrap}>
                <CreateNewProject
                  className={s.CreateNewProject}
                  onClick={() => toggleModal('createProject')}
                />
                <span>Create a project</span>
              </div>
            )}
          </SideBar>
        </aside>

        <article>
          <div className={s.headerWrap}>
            <div className={s.contentWrap}>
              <div className={s.titleWrap}>
                {showInput ? (
                  <form onSubmit={closeInputHandler}>
                    <label>
                      <input
                        value={name}
                        name="name"
                        type="text"
                        onChange={handleNameChange}
                      />
                      <button className={s.buttonSave} type="submit">
                        <SaveOutlinedIcon />
                      </button>
                    </label>
                  </form>
                ) : (
                  <>
                    <h2>{currentProject?.name}</h2>

                    <button
                      type="button"
                      className={s.buttonSave}
                      onClick={editNameHandle}
                    >
                      <EditIcon className={s.EditIcon} />
                    </button>
                  </>
                )}
              </div>

              <p>{currentProject?.description}</p>

              <div className={s.addWrap}>
                <AddGroupIcon className={s.AddGroupIcon} />
                <span onClick={() => toggleModal('addPeople')}>Add people</span>
              </div>
            </div>

            {tabletMax && (
              <CreateNewSprint
                className={s.CreateNewSprintFixed}
                onClick={() => toggleModal('createSprint')}
              />
            )}
            {tablet && (
              <div className={s.createSprintWrap}>
                {tablet && (
                  <CreateNewSprint
                    className={s.CreateNewSprint}
                    onClick={() => toggleModal('createSprint')}
                  />
                )}
                {desktop && <span>Create a sprint</span>}
              </div>
            )}
          </div>

          <SprintList currentProject={currentProject} />
        </article>
      </main>

      {showModal && (
        <Modal onCloseModal={toggleModal}>
          {el === 'createSprint' ? (
            <CreateSprint onClickCancel={toggleModal} projectId={projectId} />
          ) : el === 'addPeople' ? (
            <AddPeopleForm onClickCancel={toggleModal} projectId={projectId} />
          ) : (
            <CreateProject onClickCancel={toggleModal} />
          )}
        </Modal>
      )}
    </>
  );
};

export default SprintsPage;
