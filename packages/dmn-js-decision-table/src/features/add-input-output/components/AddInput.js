import { Component } from 'inferno';


export default class AddInput extends Component {

  constructor(props, context) {
    super(props, context);

    this._sheet = context.injector.get('sheet');
    this._eventBus = context.injector.get('eventBus');

    this._changeSupport = context.changeSupport;
    this._translate = context.injector.get('translate');
  }

  onElementsChanged = () => {
    this.forceUpdate();
  };

  componentWillMount() {
    const root = this.getRoot();

    this._changeSupport.onElementsChanged(root.id, this.onElementsChanged);
  }

  componentWillUnmount() {
    const root = this.getRoot();

    this._changeSupport.offElementsChanged(root.id, this.onElementsChanged);
  }

  getRoot() {
    return this._sheet.getRoot();
  }

  handleClick = (e) => {
    e.stopPropagation();

    this.add();
  };

  add = () => {
    this._eventBus.fire('addInput');
  };

  render() {
    return (
      <div
        onClick={ this.handleClick }
        className="add-input actionable"
        title={ this._translate('Add Input') }
      >
        <span
          className="dmn-icon-plus action-icon"
        />
      </div>
    );
  }

}