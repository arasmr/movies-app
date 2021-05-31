import { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { PlotOptions } from "../../interfaces/movie";
import './search.scss';

function SearchBar({history}: RouteComponentProps) {
    const [term, setTerm] = useState<string>('');
    const [plotOption, setPlotOption] = useState<PlotOptions>(PlotOptions.full);
    const [open, setOpen] = useState<boolean>(false);

    function handleInputChange(name: string, value: string) {
        switch (name) {
            case 'term':
                setTerm(value);
                break;
            case 'plotOptions':
                setPlotOption(value as PlotOptions);
                break;
            default:
                break;
        }
    }

    function handleSubmit(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();

        if (term.length) {
            history.replace(`/movies/${term}/${plotOption}`)
        };
    }

    function toggleForm() {
        setOpen(!open);
    }

    return (
        <>
            {open && (
                <form className="search-form">
                    <div className="search-form__input">
                        <i className="fa fa-search" onClick={() => toggleForm()}></i>
                        <input value={term} onChange={(e) => handleInputChange('term', e.target.value)} />
                    </div>
                    <select onChange={(e) => handleInputChange('plotOptions', e.target.value)}>
                        {
                            Object.entries(PlotOptions).map(([key, value]) => (
                                <option key={key} value={value}>{value} plot</option>
                            ))
                        }
                    </select>
                    <button type="submit" disabled={!term.length} onClick={(e) => handleSubmit(e)}>Search</button>
                </form>
            )}
            {!open && (
                <span className="search-form__toggle">
                    <i className="fa fa-search" onClick={() => toggleForm()}></i>
                </span>
            )}
        </>
    )
}

export default withRouter(SearchBar);