import Container from '@components/Container';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          Cloudinary + Netlify Graph
        </p>
      </Container>
    </header>
  )
}

export default Header;