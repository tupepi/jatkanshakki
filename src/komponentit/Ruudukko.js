import Rivi from './Rivi'
const Ruudukko = ({ ruudukko, onClickRuutu }) => {
    return (
        <div>
            <table>
                <tbody>
                    {ruudukko.map((rivi, indeksi) => (
                        <Rivi
                            key={indeksi}
                            riviNro={indeksi}
                            rivi={rivi}
                            onClickRuutu={onClickRuutu}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Ruudukko
