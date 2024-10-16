import Keycap from './components/Keycap';

import artisan from './assets/artisan.png';
import dye from './assets/dye.png';
import mouse from './assets/mouse.png';
import divider from './assets/divider.png';
import logo from './assets/HR-logo-BLACK.png';
import instagram from './assets/instagam.png';
import x from './assets/x.png';
import tiktok from './assets/tiktok.png';
import bar from './assets/bar.png';

function App() {
  return (
    <div className="app">
      <div className="header">
        <div className="menu">
          <div className="item">
            <img src={artisan} alt="artisan" />
          </div>
          <div className="item2">
            <img className="divider" src={divider} alt="divider" />
          </div>
          <div className="item">
            <img src={dye} alt="dye-art" />
          </div>
          <div className="item2">
            <img className="divider" src={divider} alt="divider" />
          </div>
          <div className="item">
            <img src={mouse} alt="mouse-pads" />
          </div>
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="socials">
          <div className="item">
            <img src={instagram} alt="instagram" />
          </div>
          <div className="item">
            <img src={x} alt="x" />
          </div>
          <div className="item">
            <img src={tiktok} alt="tiktok" />
          </div>
          <div className="item2">
            <img src={bar} alt="bar" />
          </div>
        </div>
      </div>
      <Keycap />
    </div>
  );
}

export default App;
