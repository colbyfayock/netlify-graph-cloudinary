import styles from './Footer.module.scss';

const Footer = ({ ...rest }) => {
  return (
    <footer className={styles.footer} {...rest}>
      <a href="https://spacejelly.dev">Space Jelly</a>
    </footer>
  )
}

export default Footer;