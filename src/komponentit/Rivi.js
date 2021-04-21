const Rivi = ({ riviNro, rivi, onClickRuutu }) => {
    return (
        <tr>
            {rivi.map((r, indeksi) => (
                <td
                    className={
                        r === 'x' ? 'risti' : r === 'o' ? 'nolla' : 'tyhja'
                    }
                    onClick={e => onClickRuutu(riviNro, indeksi, e)}
                    key={indeksi}
                >
                    <div className='alkio'>{r}</div>
                </td>
            ))}
        </tr>
    )
}

export default Rivi
