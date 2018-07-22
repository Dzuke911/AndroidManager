class JobComplexityInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: props.value};
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let val = e.target.value;

        this.setState({ value: val});
    }

    render() {
        return <div className="form-group">
            <label>Complexity</label>
            <span className="text-danger" style={{ display: 'inline-block', float: 'right' }}>{this.state.error}</span>
            <input type="number" min="0" className="form-control" value={this.state.value} onChange={this.onChange} />
        </div>;
    }
}