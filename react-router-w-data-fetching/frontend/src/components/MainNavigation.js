import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to='/' className={({ isActive }) =>
            isActive ? classes.active : undefined
            }
              end
            >HOME</NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({ isActive }) =>
            isActive ? classes.active : undefined
            }
            end>EVENTS</NavLink>
          </li>
          <li>
            <NavLink to="/events/new" className={({ isActive }) =>
            isActive ? classes.active : undefined
            }>NEW EVENT</NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              NEWS LETTER
            </NavLink>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
