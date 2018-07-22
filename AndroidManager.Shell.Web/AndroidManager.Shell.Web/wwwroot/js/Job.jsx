class Job extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: props.job };
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }
    onDelete(e) {
        this.props.onRemove(this.state.data);
    }
    onEdit(e) {
        this.props.onEdit(this.state.data);
    }
    render() {
        return <div style={{display:'inline-block',border:'1px solid'}}>
            <label>{this.state.data.Name}</label>
            <button onClick={this.onDelete}>x</button>
            <button onClick={this.onEdit}>e</button>
        </div>;
    }
}