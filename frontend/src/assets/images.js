/**
 * Central image registry.
 *
 * The URLs below are the remote assets that shipped with the design export.
 * They are hosted outside this repo and may expire (the logo is already local: `images/manjil-logo.png`). To self-host, drop files into
 * `src/assets/images/`, import them here (e.g. `import logo from './images/logo.png'`)
 * and replace the `src` values — no component needs to change.
 */

import logoImg from './images/manjil-logo.png';

const images = {
  logo: {
    src: logoImg,
    alt: 'Manjil Publications logo — an academic imprint of Pro Vidyarthi Educator Pvt Ltd',
  },
  archiveLibrary: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv9bpbqIf_L_cNjdqy_LIQU0ozRI720x5b8E-noPoQXzdEy4VyIpA6jHW08uO3bXsEsGSBl_Xpu46Y4RB3UoeNwBYJeEUXmLWCHbJQ9fycbmB-p-mKs_z7FEdo73Q2wqTwOupaZ38fBwxXe1W9IbxHxy4q4tvIUoWEGuzJiEVxxUZT8JQJXMt_fWy7zdgFERDYq9ts7OGhBW_Pr2dj6C_rBJRMgtFYH6rIKPd5PQs',
    alt: "Historical academic library archive with dark walnut bookshelves",
  },
  trusteeVarma: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFbNQiZ77zvqlFAk_hQPVQUy4mVmxlfi3lYPsnXEdIw2SqutXkbDlAZNXhPfN-GQCcDZhzRGS0w7yipz5em8nGyGOjXtUnJxZ19FAvrWBX2TSo8AT6cAu2498E9JOmWahDs9M7AgPYy84Be_hPGE56kZ5BPl2moNUkRH52iIq3ZPejPIUudIsMesZak57qNB6jrNqLYZX4JtfrstfDeXjhkcAiaZ-eRkoakAsQvXg',
    alt: "Portrait of Prof. Anand K. Varma",
  },
  trusteeSenChowdhury: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd96xZpQxW2PENdDzcZNPkwndr0otLwfK6SI-QRc5Bd-NySU7Ghd2wfDIbX1L2qgG2lEOJULgvIopaZ_IM27RliN_QljGer7YDK4xYP-uwAuW7Q_7cwYHgTiLZEU6gqIJuaflXHb1tDOSY8EEZgj6C-Oxeq_40n4XjGQvJ5fnPG7jaSneknbWVaP2gmwIDKaY5OGOW0e-pU0DJBhkU4mBDKMioB16oY_odFt3uE5U',
    alt: "Portrait of Dr. Sunita Sen-Chowdhury",
  },
  trusteeSenGupta: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRa9LuraBJd5D1JL616xrHsR6TWoEHG5gHPdQp6xzSQMEeqhCgE0Hf2dpkDsqLGdyCKMmKkasGoH8jW3lSKgMO50riCiQr11j1i3QU5cicTdNtsP1j3y1Q9q7wJg3RW04BN7BeRIdFV5OCrAi9ie-zbUdwnIFv1L7NsEMkrhsamFMc27Sd5MVXIvfYe_SO5us7pPwe37wP8J0C4jHtHTvyjULO2kUjqrnwn6Dmno4',
    alt: "Portrait of Prof. Tarun Sen Gupta",
  },
  trusteeDeshmukh: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq6AMb_DF3ZGb0q2VEW_UAMPqzmwyJRYeBWlxMk_RFs0sfjYPcnUbyXz_SZvYIfCIs4LY1rqKquQjYdR7c0z6RlFnwlK6gkU3MaBbcTyMPHXk7QICSzst3p3uYkKaK23aMh6J5_N4lNK9vpOLxtii0TGrFkS89dv0g6_1V8TRzNOwSeSe8rb-AA-pMHNxOHihxgbDWHt1tTKkKvAjEfZNzEf52BKP-vH4KI0nbYv8',
    alt: "Portrait of Meenakshi Deshmukh",
  },
  contactMap: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-0LcflhzDEoCFN7m5S8Q2HKfLV0vsyJcGNpNRaEKA0cd8qJu3RTw6XXeMOghMekitIesgvJ2aFz2H_VbFEuHThFKQ7NMfX1OOyxZTl5GsKXh9QIwFqaSDQyehZdGi1669sLGkRrX0H_P22NIpTny6TPr0wRjvDMuZMisgW3HCuE0byjBLFS6EklLydxYZ6ZbfluNOoGh8MO7iE09Qq7xH_djXWVeXw5geYzKSXCE',
    alt: "Map of the Dwarka Sector 12 area, New Delhi",
  },
  openAccessRepository: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxM2VCT-fQR8SSRdW1yoLhhPc18m8c0org35eaBsqHhSJ70E4kwWg8gVXryUySe7vdrLwx9XEGAy9Q5M8MyMC43-Uk4gZ3dhd9YCYD3Ut3QQJERlSQlKb1fbMx5rWcEykuCR8nNlMNzXFAcuWIM1gu6Bw17oUYNA_NBvRJ33yvoWjyZwLxpzClfWklMXJSA0SN9svu66Q7SbuHQSMOrvnl_yKSZdqzuMgWU7y4Dr8',
    alt: "Scholarly library research repository with illuminated study tables",
  },
  resourcesArchive: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXNcEbz6owQN948Onjb2uGu_uBlbQ9OCubkFO0_LtGEBu4bScX9tYXrfRO498N6UB6cJpOv4EVwH3qVwCTKWgL150QG2of_d5Ig_A946TOBpkcI82p93WklY0m1x9ZRujV91yzOovTMSffq-tswRusfNq30CSoU3VHZwkRqpb70sYA-pYb0T8i0WS5L_QplPkwtQGDQxC6ubSB94Ne1ycUb15oMeSp5vsfbDHcnl4',
    alt: "Leather-bound journals arranged on dark walnut shelves",
  },
  heritageHero: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCggpWn1SQUVw8TN-SrSyWfHeWaGDSHbEauMSEMmWxfbmCh8useMMyYls8m0G1gR4YUEP4fFL3J-kPR6D8B5afUWDb76jkXJ4WmlQHXNufnPdbALD2W7t8sWNlmGsSIFUqNpaQ0mBTIQJm5CTkVxAGgl_tFHSOjwUDu8P6Oq2q47sg4L6cGRXtpBNdMopqLhbJIIUfjdgG7e04fyQynYX4I-0V-mkQ89lpRG2opB4',
    alt: "Researchers reviewing open access journals in a scholarly library",
  },
  coverInterdisciplinary: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkuUucXohlVVbVf4BIQr5_09S3_k7qcv8tSM0qruTWEB5Q4y2DU5JY1fY8dzyXKanIJaJYAQn1eDw4J3UkGMGyOmtzywjH4Smdp1u7S1E4kH-efMJbIw5HE6Kw_pjwwvQ2H5K4RnCtQITx6EaawYykdK_oypyKNnjKid-zEJf0SR_2thJFVP6DwUVakvvcJtmWPNkbYelHgsst3zBqB-bcx8tIiKckJ7ZCRNxTLOg',
    alt: "Cover of Manjil Journal of Interdisciplinary Studies",
  },
  coverHeritageLiterature: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAImu3v09FBzLWdexYfX5otSi5aR7Q_RRMpAL01qxg-SUtqvJ95POGF2Fvl2tSRUlb8erAY-_8fH8T38RyfcpYf2X68glC3lNR19EAoh0MuX-DRLVjx6o-ngvh3fbZon7d4-ULjPVRu9vNsH7e-d_S07w6L81Ox6lVq7t4VLlEhb8YWFVAsYI-kQ1JFgbZFBO3yNNbdnNCWHSN5Q3NC66BxEVX0W8zXmA1AtOHWKcs',
    alt: "Cover of Archives of South Asian Heritage & Literature",
  },
  coverSocialPolicy: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuIygS1UH3MSFtLxoqMmOaSUOIkx6F8nNVSAGFqTmRmHmevVuS7nQzZA2FzQqUn95D-7LvFKF5qp3nOJZIqSiCMKpymZBm5GptCFPfiML1v3V2hrR5ZTNjiwntfaMKCtBrfwVKKLcXMRJtvj0fBToFO2yM7SE-TUPkzP6QogzevZJVbWA0XTkYK-6IM3N78cHv3EwTfIZ7b5wDWAJr1DdsMSnoDyt-hbcranSSaWA',
    alt: "Cover of Journal of Contemporary Social Policy & Law",
  },
  coverPublicHealth: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnHlp8D-y0_poWmW13aJ8fjoR_kvMncg3eXkOSIB_Urxu28LP_2FThW6lL8Gd1e3fJDvkQahrodd-MlwxlQJqzSLxSfwC0gWGlxLQrNq0in04p4SYLr5ZNMzH8M2JNloYlMHYD8CpfM2OR3OA6v86H35VuIpcfvqnE9bD_ifwweY1xozDg2RcdIRDKHepKdlBHj6ERkmGdgEuThlDph3FdChgPy0m1xJVQDbt-yYE',
    alt: "Cover of International Journal of Public Health Innovations",
  },
  coverScienceEthics: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2cll8hNbyC9OkYzlKo1lXy7a48eyEJV4AjBUgWcx6tC8i7t4pkwygEjhT3WzLVxWrbR2j2pXFU7ruCmIHRs4RjWpKhNlQDClyboYCIAT6lOK_v0CpdO4jAeulLRmg-YNfFbaISaz-GJfLi3ol-ECdA_-X8eDo7ofQsSnakES2HI4hil0Lxi5SSQHnuLeeD7INm8UoPwpcz2UYNxTrrEpNsmVBUaCE2kiCFzlPdr8',
    alt: "Cover of Manjil Review of Science, Ethics & Technology",
  },
  monographIndic: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXFDP9Dhdarl45PzQ2cSFIojnSBa6kkhync1qP3QNDUEc_fFdI_cfcgvdiOrk_yHTy6qGIUjl65bArXQF5I6UC4GfC79C73HQH-wyNDLYfRyq426kTuB82d7okO-gDyBbvZMvAFmVv_a7zaavc30AfgNvhjURWazyF591Oow9xyxcUIqNk04_oSUOVpOHmoE10s1qCYDXLsFlTXfDTTvwmOxyclkTPykN6hSK72Xs',
    alt: "Hardcover monograph Studies in Indic Historiography",
  },
  libraryPartnership: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEOzx7D4f3zrlP2p83Hq33c8sCiEgJyzd-bcRtNVtuZhfSOq1vNDhVoFYk8iKSLgwZKyPyyZrYWVJiJvaMWdyaMHFpdYBM5hRFl_uwvI5VGrV65NF9jlflpWM2HlWXuFYIfzakyAo0xmwfWcbKza7V4WlG4wz1Mr6TEbynm_yrwxyfeJswMGLO1qXErXMmag3sVMoIFLEoCkoaumlbqEjfOnQqbWkVJ-v8Xx4EMl0',
    alt: "Grand university research library with mahogany bookshelves",
  },
};

export default images;
