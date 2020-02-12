
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronUp,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faQuestionCircle,
  faCheck,
  faPlus,
  faEdit,
  faSave,
  faMinus,
  faTimes,
  faBolt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const Fonts = {
  install(Vue) {
    library.add(
      faChevronUp,
      faChevronDown,
      faChevronRight,
      faChevronLeft,
      faQuestionCircle,
      faCheck,
      faPlus,
      faEdit,
      faSave,
      faMinus,
      faTimes,
      faBolt
    );
    Vue.component('font-awesome-icon', FontAwesomeIcon);
  }
}

export default Fonts;