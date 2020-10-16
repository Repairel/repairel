import Navbar from '@components/navbar';
import Menu from '@components/menu';

const Header = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    open
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [open]);
  return (
    <header>
      <Menu open={open} setOpen={setOpen} />
      <Navbar open={open} setOpen={setOpen} />
    </header>
  );
};
export default Header;
