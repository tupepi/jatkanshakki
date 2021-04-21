import './App.css'
import React, { useState } from 'react'
import Ruudukko from './komponentit/Ruudukko'
import Pisteet from './komponentit/Pisteet'

const App = () => {
    const luoTyhjaTaulukko = koko => {
        var rivi = []
        for (var i = 0; i < koko; i++) {
            rivi.push('')
        }

        //console.log(rivi)
        var ruudukko = []
        for (var j = 0; j < koko; j++) {
            ruudukko.push(rivi.slice())
        }

        return ruudukko
    }
    const peliRuudunKoko = 35
    const [ristinVuoro, setRistinVuoro] = useState(true)
    const [ruudukko, setRuudukko] = useState(luoTyhjaTaulukko(peliRuudunKoko))
    const [edellinenRuudukko, setEdellinenRuudukko] = useState(ruudukko)
    const [peliPaattynyt, setPeliPaattynyt] = useState(false)
    const [saaKumota, setSaaKumota] = useState(false)
    const [pelaajaXPisteet, setPelaajaXPisteet] = useState(0)
    const [pelaajaOPisteet, setPelaajaOPisteet] = useState(0)
    const [aloittajaOnRisti, setAloittajaOnRisti] = useState(true)
    const [voitto, setVoitto] = useState('')

    const peliLoppui = kumpi => {
        setVoitto(kumpi + ' voitti')
        if (ristinVuoro) {
            setPelaajaXPisteet(pelaajaXPisteet + 1)
            setAloittajaOnRisti(false)
        } else {
            setPelaajaOPisteet(pelaajaOPisteet + 1)
            setAloittajaOnRisti(true)
        }

        setPeliPaattynyt(true)
        setSaaKumota(false)
    }

    // Kun klikataan ruutua
    const onClickRuutu = (sarakeNro, riviNro) => {
        // jos peli on jo päättynyt
        if (peliPaattynyt) return
        setSaaKumota(true)
        // Jos ruudussa on jo merkki, lähetään poijjes
        if (
            ruudukko[sarakeNro][riviNro] === 'x' ||
            ruudukko[sarakeNro][riviNro] === 'o'
        ) {
            return
        }
        // vanhasta peliruudusta kopio, jota saa muokata
        var uusiRuudukko = ruudukko.map(rivi => {
            return rivi.slice()
        })
        // klikattuun ruutuun joko x tai o riippuen vuorosta
        uusiRuudukko[sarakeNro][riviNro] = ristinVuoro ? 'x' : 'o'

        // tuliko voitto
        tarkastaTilanne(riviNro, sarakeNro)

        // vaihdetaan vuoro ja pelilauta uudeksi
        setRistinVuoro(!ristinVuoro)
        setEdellinenRuudukko(ruudukko)
        setRuudukko(uusiRuudukko)
    }

    //tarkistaa onko annetussa ruudussa annettu merkki
    const tarkistaRuutu = (sarake, rivi, merkki) => {
        if (
            rivi < 0 ||
            sarake < 0 ||
            rivi >= peliRuudunKoko ||
            sarake >= peliRuudunKoko
        ) {
            return false
        }
        return ruudukko[sarake][rivi] === merkki
    }
    // Tarkastaa voittiko siirron jälkeen jompikumpi
    const tarkastaTilanne = (rivi, sarake) => {
        var vuorossa = ristinVuoro ? 'x' : 'o'
        var montakoOikein = 1 // pitää kirjan monenko suora on kerätty
        const kert = [0, 0, 1, -1, -1, 1, -1, 1]
        const kert2 = [-1, 1, 0, 0, -1, 1, 1, -1]

        for (var i = 0; i < kert.length; i++) {
            // kertoimet päättävät tarkistussuunnan
            // 8 suuntaa: vasen-oikea,ylävasen-alaoikea,ylä-ala, jne.
            var n1 = kert[i]
            var n2 = kert2[i]

            //nollataan osumarivi vain kun vaihdetaan tarkistus suuntaa
            // esim vinosta pystysuoraan
            if (i % 2 === 0) montakoOikein = 1

            for (var j = 0; j < 4; j++) {
                // Jos EI osunu vaihdetaan suuntaa
                if (
                    !tarkistaRuutu(
                        sarake - n1 * (1 + j),
                        rivi - n2 * (1 + j),
                        vuorossa
                    )
                ) {
                    break
                    // vaikka ei osunut oikeaan niin pidetään
                    // tallessa osumat, kun lähdetään tarkistamaan
                    // vastakkaista suuntaa
                }
                // oikean osuman jälkeen tarkistetaan voitto
                montakoOikein++
                if (montakoOikein >= 5) peliLoppui(vuorossa)
            }
        }
    }

    const kumoa = () => {
        if (!saaKumota) return
        setSaaKumota(false)
        setRuudukko(edellinenRuudukko)
        setPeliPaattynyt(false)
        setRistinVuoro(!ristinVuoro)
    }
    const alusta = () => {
        setSaaKumota(false)
        setRuudukko(luoTyhjaTaulukko(peliRuudunKoko))
        setEdellinenRuudukko(ruudukko)
        setPeliPaattynyt(false)
        setRistinVuoro(aloittajaOnRisti)
        setVoitto('')
    }
    return (
        <div className='App'>
            <div className='pisteet'>
                <Pisteet pelaaja='X' pisteet={pelaajaXPisteet} />
                <Pisteet pelaaja='O' pisteet={pelaajaOPisteet} />
                <div className='voitto'>
                    <p>{voitto}</p>
                </div>
                <p className='ohje'>
                    Jätkänshakki eli viiden suora.
                    <br />
                    Häviäjä aloittaa uuden pelin.
                    <br />
                </p>
            </div>

            <Ruudukko
                className='ruudukko'
                ruudukko={ruudukko}
                onClickRuutu={onClickRuutu}
            />

            <div className='napit'>
                <button className='nappi' onClick={alusta}>
                    Alusta
                </button>
                <button className='nappi' onClick={kumoa}>
                    Kumoa
                </button>
            </div>
        </div>
    )
}

export default App
