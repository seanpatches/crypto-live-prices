import { CurrencyTypes } from "../types";

export const images = {
    FLOW: "https://dynamic-assets.coinbase.com/00ec02d5bad8ff25a8d3d7ac3829094182c612bb4fa883eaa96092c433271176de7d48b3b75c686f01b10ae274b3868870506e503995132954a5678af6a53664/asset_icons/fa89d5746755536254fa3351b74e1edf179a9466736dc0d9845e694135fabdfb.png",
    ALGO: "https://dynamic-assets.coinbase.com/434cf9473be68c296f9c213b64a8caaebeb0f0fcf4096f38af3175eead7107425676652c9219c003f2acaafdcb07bce1f4862fe4f3f692ca1ae1da3c3dbff546/asset_icons/40447ba4170da28e92cf5c02d5675103d44d75fd6076ad8b0f5a953b3d4d3b9e.png",
    BTC: "https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png",
    ETH: "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
    LTC: "https://dynamic-assets.coinbase.com/f018870b721574ef7f269b9fd91b36042dc05ebed4ae9dcdc340a1bae5b359e8760a8c224bc99466db704d10a3e23cf1f4cd1ff6f647340c4c9c899a9e6595cd/asset_icons/984a4fe2ba5b2c325c06e4c2f3ba3f1c1fef1f157edb3b8ebbfe234340a157a5.png",
}

export const getImage = (currency: string): string => {
    const image = images[currency as CurrencyTypes] || defaultImage;
    return image;
}

export const defaultImage = "https://static-assets.coinbase.com/assets/placeholder-0.png";