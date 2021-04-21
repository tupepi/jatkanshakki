const Pisteet = ({ pelaaja, pisteet }) => {
    return (
        <div className={'pelaaja' + pelaaja}>
            <h3>{'Pelaaja-' + pelaaja}</h3>
            <p>Pisteet:{pisteet}</p>
        </div>
    )
}

export default Pisteet
