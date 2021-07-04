// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../react-confirm-alert.css';

import projectsOperations from 'redux/projects/projects-operations';

// import ButtonDelete from '../ButtonDelete';
import ButtonDelete from '../ButtonDeleteProject';

// import { getLoadingProjects } from 'redux/projects/projects-selectors';

import styles from './ProjectItem.module.scss';
// import Spinner from 'components/Loader/Loader';

const ProjectItem = ({ project }) => {
  // const loading = useSelector(getLoadingProjects);
  const dispatch = useDispatch();

  const handleClickDelete = () =>
    dispatch(projectsOperations.deleteProject(project.id));

  const onClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={styles.custom_ui}>
            <h1>Are you sure?</h1>
            <p>You want to delete this project?</p>
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={styles.rdyBtn}
              type="button"
              onClick={() => {
                handleClickDelete();
                onClose();
              }}
            >
              Ready
            </button>
          </div>
        );
      },
    });
  };

  return (
    <>
      <NavLink
        className={styles.NavLink}
        to={{
          pathname: `/projects/${project.id}`,
        }}
      >
        <div className={styles.itemWrapper}>
          {/* {loading && <Spinner />} */}
          <h3 className={styles.itemTitle}>{project.name}</h3>
          <p className={styles.itemDescription}> {project.description}</p>
        </div>
      </NavLink>
      <div className={styles.buttonWrapper}>
        <ButtonDelete handleClick={onClick} />
      </div>
    </>
  );
};

export default ProjectItem;

// ProjectItem.propTypes = {
//   name: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
// };
