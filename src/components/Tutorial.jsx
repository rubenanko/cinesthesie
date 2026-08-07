function Tutorial()
{
    const steps = [
        {
            step: "I",
            title: "La carte",
            text: "Depuis cet écran, apercevez l'ensemble des films. Les vignettes que vous n'avez pas encore découvertes restent dans l'ombre — elles se révèleront au fil de votre exploration.",
            rot: -1.2,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 4 3 6.2v13.6L9 17.6m0-13.6 6 2.2m-6-2.2v13.6m6-11.4L21 4.2v13.6L15 19.8m0-13.4v13.4M9 17.6l6 2.2" />
                </svg>
            ),
        },
        {
            step: "II",
            title: "Plonger",
            text: "Cliquez sur une vignette révélée pour vous y rendre, ou enclenchez le bouton pour reprendre votre dernière position.",
            rot: 1.5,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 4.5a7 7 0 1 0 5 5" />
                    <path d="M12 8v4l2.5 2.5" />
                    <path d="M19 3l2 2-2 2" />
                </svg>
            ),
        },
        {
            step: "III",
            title: "Défiler",
            text: "En mode exploration, la molette vous fait avancer de film en film. Chaque mouvement révèle un titre, un préambule, puis la scène elle-même.",
            rot: -0.8,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="3" width="12" height="18" rx="6" />
                    <path d="M12 7v3" />
                </svg>
            ),
        },
        {
            step: "IV",
            title: "La boussole",
            text: "Cliquez sur la boussole en bas à droite, ou appuyez sur <kbd>Espace</kbd>, pour basculer entre l'axe vertical et l'axe horizontal.",
            rot: 1.1,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 22.981l4.12-11.49L12 1.149 7.88 11.49z" fill="currentColor" stroke="none" />
                    <path d="M9.125 12h5.75L12 20.019z" />
                </svg>
            ),
        },
        {
            step: "V",
            title: "À venir",
            text: "Les films à paraître affichent un compte à rebours. Patientez — ils rejoindront bientôt le jardin.",
            rot: -1.6,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="13" r="8" />
                    <path d="M12 9v4l2.5 2" />
                    <path d="M9 2h6M12 5V2" />
                </svg>
            ),
        },
        {
            step: "VI",
            title: "Revenir",
            text: "Appuyez sur <kbd>Échap</kbd> à tout moment pour regagner la carte et contempler votre progression.",
            rot: 0.9,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5" />
                    <path d="M11 6l-6 6 6 6" />
                </svg>
            ),
        },
    ];

    return (
        <section className="tutorial" id="tutorial">
            <div className="tutorial-heading">
                <span className="rule" />
                <h2 className="tutorial-title">Le guide</h2>
                <span className="rule" />
            </div>
            <p className="tutorial-sub">six gestes pour arpenter le jardin</p>
            <div className="tutorial-grid">
                {steps.map((s, i) => (
                    <article className="tutorial-card" key={i}
                             style={{"--i": i, "--rot": `${s.rot}deg`}}>
                        <div className="tutorial-card-head">
                            <span className="tutorial-icon">{s.icon}</span>
                            <span className="tutorial-step">{s.step}</span>
                        </div>
                        <h3 className="tutorial-card-title">{s.title}</h3>
                        <p className="tutorial-card-text" dangerouslySetInnerHTML={{__html: s.text}} />
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Tutorial;
