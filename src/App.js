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
          <div className="item1">
            <img src={artisan} alt="artisan" />
          </div>
          <div className="item2">
            <img className="divider" src={divider} alt="divider" />
          </div>
          <div className="item1">
            <img src={dye} alt="dye-art" />
          </div>
          <div className="item2">
            <img className="divider" src={divider} alt="divider" />
          </div>
          <div className="item1">
            <img src={mouse} alt="mouse-pads" />
          </div>
        </div>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="menu2">
          <div className="item1">
            <img src={artisan} alt="artisan" />
          </div>
          <div className="item2">
            <img className="divider" src={divider} alt="divider" />
          </div>
          <div className="item1">
            <img src={dye} alt="dye-art" />
          </div>
          <div className="item2">
            <img className="divider" src={divider} alt="divider" />
          </div>
          <div className="item1">
            <img src={mouse} alt="mouse-pads" />
          </div>
        </div>
        <div className="menu3">
          <div className="item1">
            <img src={artisan} alt="artisan" />
          </div>

          <div className="item1">
            <img src={dye} alt="dye-art" />
          </div>
          <div className="item1">
            <img src={mouse} alt="mouse-pads" />
          </div>
        </div>
        <div className="socials">
          <div className="item">
            <a
              href="https://www.instagram.com/humansplusrobots"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagram} alt="instagram" />
            </a>
          </div>
          <div className="item">
            <a
              href="https://x.com/humans_n_robots"
              target="_blank"
              rel="noreferrer"
            >
              <img src={x} alt="x" />
            </a>
          </div>
          <div className="item">
            <a
              href="https://www.tiktok.com/@humansandrobots"
              target="_blank"
              rel="noreferrer"
            >
              <img src={tiktok} alt="tiktok" />
            </a>
          </div>
          <div className="item2">
            <img src={bar} alt="bar" />
          </div>
        </div>
      </div>
      <Keycap />
      <div className="footer">
        <div className="socials2">
          <div className="item">
            <a
              href="https://www.instagram.com/humansplusrobots"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagram} alt="instagram" />
            </a>
          </div>
          <div className="item">
            <a
              href="https://x.com/humans_n_robots"
              target="_blank"
              rel="noreferrer"
            >
              <img src={x} alt="x" />
            </a>
          </div>
          <div className="item">
            <a
              href="https://www.tiktok.com/@humansandrobots"
              target="_blank"
              rel="noreferrer"
            >
              <img src={tiktok} alt="tiktok" />
            </a>
          </div>
        </div>
        <div className="socials2">
          <div className="item2">
            <img src={bar} alt="bar" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
