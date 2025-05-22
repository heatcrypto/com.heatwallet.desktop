'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"zxing.js": "cb9338a3e8f51448369ea9b5e5e82f7e",
"flutter_bootstrap.js": "1b44d4d7b86e93219b2a68820a55e2d3",
"version.json": "bf2b05e3e537124059f3610fc1e5ae85",
"service-worker-crypto.js": "4f7001fad4a8f5a371a1f3aab6facb32",
"index.html": "fa8bb15212383a27ff3b3190ca00be8b",
"/": "fa8bb15212383a27ff3b3190ca00be8b",
"firebasejs/firebase-app-compat.js": "8a56edcbd47cea4559f7edd27d3a7236",
"firebasejs/firebase-app.js": "c4b79631041e9f362e3d5390ff3212c4",
"firebasejs/firebase-messaging-compat.js": "98bdb57050d1d380280f2fb42c865d5b",
"firebasejs/firebase-messaging.js": "604eee23cd03b8a58170ca10098cb7d5",
"firebase-messaging-sw.js": "fa04993d27f9b2936a1fb154a0f81611",
"landing_page.js": "3107616938804aa7630ac76a8488924d",
"main.dart.js": "317c3f5c6eafdd1142633f56d7f685d1",
"service-worker-handlers.js": "bf5c30f7e11b784e2ca0f3266e660fe0",
"apple-app-site-association": "8e8f77104f720e6c9dcc8518c3d5ebfb",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"index.js": "4d7297920cdb7c51e6011133155cf073",
"assetlinks.json": "18245b6a597ac4d1c09c0248069cdf5a",
"index.html.BACKUP": "e63c24c66ceeaa9e0b75f066196f914f",
"favicon.png": "d7738c86eb08b657fce26621c84c85b6",
"icons/Icon-16.png": "1476136fd679f73c2d5844d8cc268740",
"icons/Icon-192.png": "15260ae16cb445946df1711528f38295",
"icons/Icon-48.png": "7b5614d83620a1c9562d4334028e3739",
"icons/Icon-maskable-192.png": "15260ae16cb445946df1711528f38295",
"icons/Icon-maskable-512.png": "363b8f25e20d036f0bed0906f36f5e63",
"icons/Icon-128.png": "0261e1777d12eb4b870d30076aee8866",
"icons/Icon-512.png": "363b8f25e20d036f0bed0906f36f5e63",
"manifest.json": "1b389ecf1266523e2162c10c99f06f0e",
"landing_page.html": "0793b7c7ff20963788881b6c050821a5",
"flutter_service_worker_extra.js": "8dfb648bdf4dcfbc87efe7f1bad6635c",
"__test_click__.html": "b1b0b53657e07e32ffa37cbf18593a03",
"assets/AssetManifest.json": "8c319edd269eae523063c8191fd96a5c",
"assets/NOTICES": "36a8a54373cd9d162d303b807bfb2966",
"assets/FontManifest.json": "60753db977fb654ff160f94cf792eac0",
"assets/AssetManifest.bin.json": "7151288804311e1335f5dee35ef54dc8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/packages/flutter_js/assets/js/fetch.js": "277e0c5ec36810cbe57371a4b7e26be0",
"assets/packages/flutter_chat_ui/assets/icon-seen.png": "b9d597e29ff2802fd7e74c5086dfb106",
"assets/packages/flutter_chat_ui/assets/2.0x/icon-seen.png": "10c256cc3c194125f8fffa25de5d6b8a",
"assets/packages/flutter_chat_ui/assets/2.0x/icon-attachment.png": "9c8f255d58a0a4b634009e19d4f182fa",
"assets/packages/flutter_chat_ui/assets/2.0x/icon-error.png": "5a59dc97f28a33691ff92d0a128c2b7f",
"assets/packages/flutter_chat_ui/assets/2.0x/icon-arrow.png": "8efbd753127a917b4dc02bf856d32a47",
"assets/packages/flutter_chat_ui/assets/2.0x/icon-send.png": "2a7d5341fd021e6b75842f6dadb623dd",
"assets/packages/flutter_chat_ui/assets/2.0x/icon-document.png": "e61ec1c2da405db33bff22f774fb8307",
"assets/packages/flutter_chat_ui/assets/2.0x/icon-delivered.png": "b6b5d85c3270a5cad19b74651d78c507",
"assets/packages/flutter_chat_ui/assets/icon-attachment.png": "17fc0472816ace725b2411c7e1450cdd",
"assets/packages/flutter_chat_ui/assets/icon-error.png": "4fceef32b6b0fd8782c5298ee463ea56",
"assets/packages/flutter_chat_ui/assets/3.0x/icon-seen.png": "684348b596f7960e59e95cff5475b2f8",
"assets/packages/flutter_chat_ui/assets/3.0x/icon-attachment.png": "fcf6bfd600820e85f90a846af94783f4",
"assets/packages/flutter_chat_ui/assets/3.0x/icon-error.png": "872d7d57b8fff12c1a416867d6c1bc02",
"assets/packages/flutter_chat_ui/assets/3.0x/icon-arrow.png": "3ea423a6ae14f8f6cf1e4c39618d3e4b",
"assets/packages/flutter_chat_ui/assets/3.0x/icon-send.png": "8e7e62d5bc4a0e37e3f953fb8af23d97",
"assets/packages/flutter_chat_ui/assets/3.0x/icon-document.png": "4578cb3d3f316ef952cd2cf52f003df2",
"assets/packages/flutter_chat_ui/assets/3.0x/icon-delivered.png": "28f141c87a74838fc20082e9dea44436",
"assets/packages/flutter_chat_ui/assets/icon-arrow.png": "678ebcc99d8f105210139b30755944d6",
"assets/packages/flutter_chat_ui/assets/icon-send.png": "34e43bc8840ecb609e14d622569cda6a",
"assets/packages/flutter_chat_ui/assets/icon-document.png": "b4477562d9152716c062b6018805d10b",
"assets/packages/flutter_chat_ui/assets/icon-delivered.png": "b064b7cf3e436d196193258848eae910",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "b683575324caa48df5e01e8507d6fe90",
"assets/fonts/MaterialIcons-Regular.otf": "f32c2c80df4bd77395f0ba56a00b77ec",
"assets/assets/registry.json": "d8791f7222fcad74b5c2de0d0faabfea",
"assets/assets/images/small-open-datasets/flags/TG.png": "022f25af374e24880cf250c1a579577a",
"assets/assets/images/small-open-datasets/flags/ME.png": "1633fe358e8af501c191ed4686fb8ae5",
"assets/assets/images/small-open-datasets/flags/LA.png": "0a4d5d3c3849e6af519497769ce0ae8f",
"assets/assets/images/small-open-datasets/flags/MR.png": "74bee44211ac68bdebe9a18a9ff7c9bc",
"assets/assets/images/small-open-datasets/flags/NI.png": "c2b58877ccd706e7333c30facaba65ab",
"assets/assets/images/small-open-datasets/flags/LV.png": "4c8ba448844eca593fda75ae187d87b5",
"assets/assets/images/small-open-datasets/flags/OM.png": "9ea17177488efa2bde46b3403674b7cb",
"assets/assets/images/small-open-datasets/flags/AF.png": "919ce336b2e726883c524f4e32c8df33",
"assets/assets/images/small-open-datasets/flags/CY.png": "4a782883464326a8543cee1786f8a8b4",
"assets/assets/images/small-open-datasets/flags/BJ.png": "5eb5bb86c20392c45475059427542d56",
"assets/assets/images/small-open-datasets/flags/AQ.png": "8c84480cd9f25d3df9bd6791042b1b78",
"assets/assets/images/small-open-datasets/flags/CN.png": "0c22754a0d19102afb3c36062cfd55a7",
"assets/assets/images/small-open-datasets/flags/GB-SCT.png": "573a4846cd2c9d51a7d90fe967410a43",
"assets/assets/images/small-open-datasets/flags/CO.png": "9e2515528e2c1470bd2a9a324f10ca01",
"assets/assets/images/small-open-datasets/flags/CX.png": "2139fd43b274d25d4801aa64c952efdf",
"assets/assets/images/small-open-datasets/flags/AG.png": "482baa2a9c3921816207655437ae43c8",
"assets/assets/images/small-open-datasets/flags/MS.png": "00746fb8fc40ac3280afc468b85e6bd9",
"assets/assets/images/small-open-datasets/flags/MD.png": "c35ccb0e12e3f35ccec30f461a22f0c1",
"assets/assets/images/small-open-datasets/flags/ZM.png": "066930a69b811a4248d336104eed1e78",
"assets/assets/images/small-open-datasets/flags/VN.png": "21dd0c5dd9091fb61d7d96561a5fc8ad",
"assets/assets/images/small-open-datasets/flags/TF.png": "7958bf72ff286f785601f6bd7b6ad90d",
"assets/assets/images/small-open-datasets/flags/TD.png": "912e433a239002634aa5446909d8902b",
"assets/assets/images/small-open-datasets/flags/YT.png": "82f4717cda449ffc82445cc797b3b92f",
"assets/assets/images/small-open-datasets/flags/LB.png": "7eae8509b55995727f57cccbd6766a22",
"assets/assets/images/small-open-datasets/flags/LU.png": "bbf771ffd7fd927549c424cec82a5f35",
"assets/assets/images/small-open-datasets/flags/MQ.png": "51d6cd158e8f425f0692af89f52fb482",
"assets/assets/images/small-open-datasets/flags/CZ.png": "773dbd9dce1e9abc3da58b545a39b056",
"assets/assets/images/small-open-datasets/flags/AE.png": "848bcc99a1884fb14fe59883d82b697f",
"assets/assets/images/small-open-datasets/flags/CM.png": "7a68210b12f313aefe41fbced8d7d76f",
"assets/assets/images/small-open-datasets/flags/BI.png": "7ec3ca7e9ade569dfc33e65f58ce8853",
"assets/assets/images/small-open-datasets/flags/AR.png": "56909f3871b57faf7863481726e67104",
"assets/assets/images/small-open-datasets/flags/AS.png": "be1cecf69f391c0061260eb9ebc5b0e5",
"assets/assets/images/small-open-datasets/flags/BH.png": "94e626df3e2ac6a5500a7b839529edca",
"assets/assets/images/small-open-datasets/flags/CL.png": "e63178a3fa0e39493735f2d97bbe66ac",
"assets/assets/images/small-open-datasets/flags/AD.png": "05f0531322046032b8c6ebb8e0d5da04",
"assets/assets/images/small-open-datasets/flags/MP.png": "c1ac6b1d6a0b38daac7d4395a8d48d39",
"assets/assets/images/small-open-datasets/flags/LT.png": "14810c63dc7941a87841a6f9cfee7781",
"assets/assets/images/small-open-datasets/flags/MG.png": "6eced9aa50a7f97f1a6ba5979c73493b",
"assets/assets/images/small-open-datasets/flags/LC.png": "6d205af376d240acf6730f772e6d3f51",
"assets/assets/images/small-open-datasets/flags/TR.png": "1d324dbc61557cca73e5b2adc28f9d93",
"assets/assets/images/small-open-datasets/flags/UA.png": "89af61c82d9a4705698afde1cb0fd91d",
"assets/assets/images/small-open-datasets/flags/TV.png": "e170af4bdd6a44778326ae46a46a8cbe",
"assets/assets/images/small-open-datasets/flags/VI.png": "6031b637f879f5a76c1b399b9922c8d0",
"assets/assets/images/small-open-datasets/flags/TA.png": "8ae7df95e9bd73f30994d41facb02b32",
"assets/assets/images/small-open-datasets/flags/MT.png": "3bde18789d542af91f821597d4215407",
"assets/assets/images/small-open-datasets/flags/NO.png": "127af7a387e5d4918543af4c5105253f",
"assets/assets/images/small-open-datasets/flags/MC.png": "59225932423394e7ea8b3d2aa56447b2",
"assets/assets/images/small-open-datasets/flags/CH.png": "b2b1f9083b9cd47f8d10f3753a3cfcb9",
"assets/assets/images/small-open-datasets/flags/BL.png": "290f01a3d9199034a99986466793cec3",
"assets/assets/images/small-open-datasets/flags/AW.png": "49e21d3f39824ea1c563749c149170af",
"assets/assets/images/small-open-datasets/flags/BZ.png": "a9f3cd34695662cc69891a144cc24db6",
"assets/assets/images/small-open-datasets/flags/BM.png": "110b5853423d0a205f243457b77bf469",
"assets/assets/images/small-open-datasets/flags/CI.png": "24b89f069b7eb91daa087cdd3ec0048c",
"assets/assets/images/small-open-datasets/flags/MU.png": "e801112920de98e02e519aca68c2fe7d",
"assets/assets/images/small-open-datasets/flags/US.png": "f83c34cf86bc7d6132e406964a348b9d",
"assets/assets/images/small-open-datasets/flags/TW.png": "09a8cf18f5448a7593f5927a598dc4d3",
"assets/assets/images/small-open-datasets/flags/YE.png": "716766605291ee9fb54c5b59d19fb916",
"assets/assets/images/small-open-datasets/flags/MW.png": "4432bfaa254cea9efd9fc1b56698a61d",
"assets/assets/images/small-open-datasets/flags/NL.png": "28e4e5e54efc6f9ec072156d79ac2d9e",
"assets/assets/images/small-open-datasets/flags/LS.png": "658d71b5fbac4ccb98d7077b64b0b94e",
"assets/assets/images/small-open-datasets/flags/BO.png": "e25fd149ec73b8a1e1f016d0350afe2b",
"assets/assets/images/small-open-datasets/flags/AT.png": "99160f9a7deb435c96712bbc37b75c11",
"assets/assets/images/small-open-datasets/flags/CK.png": "7b6d0a250ed8e2ea36610aa8cc35b49b",
"assets/assets/images/small-open-datasets/flags/AC.png": "faefe7ca1b0d36cd99d17b8acaf68086",
"assets/assets/images/small-open-datasets/flags/BY.png": "8046dfb5e9170116250b7275b54d8eb9",
"assets/assets/images/small-open-datasets/flags/AU.png": "b5767003a1c4265311b9a96d84b73ce5",
"assets/assets/images/small-open-datasets/flags/BN.png": "28bf82027b52174a2fd11b686575a63f",
"assets/assets/images/small-open-datasets/flags/MA.png": "8dbd30181f93aa7a05605e7df4b3f623",
"assets/assets/images/small-open-datasets/flags/NZ.png": "a2b8d4e8079e40787b8a3feabf73a2a7",
"assets/assets/images/small-open-datasets/flags/LR.png": "aae0a5c83c21f1c09383dea39fb02e2d",
"assets/assets/images/small-open-datasets/flags/MV.png": "d4d8a5fbd9073293441c65382d03887d",
"assets/assets/images/small-open-datasets/flags/TC.png": "ba00646f268b5a341f20388f7764894c",
"assets/assets/images/small-open-datasets/flags/UG.png": "da050410209631897769156b7910fa57",
"assets/assets/images/small-open-datasets/flags/TT.png": "76d0074ded1ccf3daa7d1d8e0cb0b373",
"assets/assets/images/small-open-datasets/flags/PL.png": "fab7b77fa633cbf99fcb5e0bd73dde08",
"assets/assets/images/small-open-datasets/flags/RS.png": "9eeb81b40f121587137e7ba11379e4c3",
"assets/assets/images/small-open-datasets/flags/IN.png": "024e6f7bd8b0050129a6fb9e8505848f",
"assets/assets/images/small-open-datasets/flags/GE.png": "dcfa81a5122e533613cf7131305e8190",
"assets/assets/images/small-open-datasets/flags/GR.png": "2d527d7d3c7844242d69290c1d168dab",
"assets/assets/images/small-open-datasets/flags/GS.png": "343ea7509d53dea4ef0810896796f2e2",
"assets/assets/images/small-open-datasets/flags/GD.png": "2be8e435b9631728e09d5f8a79a0b452",
"assets/assets/images/small-open-datasets/flags/IO.png": "e779ec2b0641a950fb1f74eed428f3ab",
"assets/assets/images/small-open-datasets/flags/HK.png": "d7c349234d526636c094b800a6448378",
"assets/assets/images/small-open-datasets/flags/KP.png": "8986893c1b03f4026816b77fd0c29373",
"assets/assets/images/small-open-datasets/flags/KG.png": "5d93059207cb88d75ef3409e56ff32f3",
"assets/assets/images/small-open-datasets/flags/PM.png": "0f62695ec266de6195480d0639044ee0",
"assets/assets/images/small-open-datasets/flags/SV.png": "68abf2a724e3f5ab30a9bb272975fbe1",
"assets/assets/images/small-open-datasets/flags/RE.png": "4422445e1fff3ae11e81cd8d90cccad4",
"assets/assets/images/small-open-datasets/flags/SA.png": "db2f9cb5dd2b7525bf67e79c1c154e11",
"assets/assets/images/small-open-datasets/flags/SC.png": "3c31bac461c416e1d01fe88d06435bfc",
"assets/assets/images/small-open-datasets/flags/ST.png": "d6b310e1330da3db6fa440e00b5dab12",
"assets/assets/images/small-open-datasets/flags/KE.png": "fa91f6721e00b24676020597333df0db",
"assets/assets/images/small-open-datasets/flags/IM.png": "c8461fe21c213ffd20197cae996520d8",
"assets/assets/images/small-open-datasets/flags/KR.png": "afb310a6123252568cb701f38a2226ca",
"assets/assets/images/small-open-datasets/flags/GF.png": "45fd90e76c374de75cb6c5c42ba5d71b",
"assets/assets/images/small-open-datasets/flags/DJ.png": "c385c17e0d7cacc9d43ff6262f2d630d",
"assets/assets/images/small-open-datasets/flags/GQ.png": "db987eca42e26b18ae64e1a8203ae1e4",
"assets/assets/images/small-open-datasets/flags/GP.png": "172c0814c5c52e7b67f2306f0eb7cba9",
"assets/assets/images/small-open-datasets/flags/DK.png": "b04101621ea736d91eb2972130d216ef",
"assets/assets/images/small-open-datasets/flags/GG.png": "6f51dc1590e869aab10a342b8dd5dbb1",
"assets/assets/images/small-open-datasets/flags/IL.png": "2146b489d52e43454de8447b40dea7f6",
"assets/assets/images/small-open-datasets/flags/PN.png": "51e2858a96b95832d39ce95a05e70f51",
"assets/assets/images/small-open-datasets/flags/SB.png": "b2346754f3e8c82d23a6903d25c499d2",
"assets/assets/images/small-open-datasets/flags/PY.png": "7cfb7265b92acbc3ea1821db1b4019b2",
"assets/assets/images/small-open-datasets/flags/RU.png": "1e8dc28d95116ca6bde361f03a0460dd",
"assets/assets/images/small-open-datasets/flags/KW.png": "da2cd58a57136466bee9cb1956426587",
"assets/assets/images/small-open-datasets/flags/DO.png": "f7a1c5065d432c76b036ad8b7be9ceeb",
"assets/assets/images/small-open-datasets/flags/GT.png": "89f0f8fbf58d0e1e54be5464d487d00c",
"assets/assets/images/small-open-datasets/flags/GB.png": "27d7f02f2823b5afdf6395d1d5249825",
"assets/assets/images/small-open-datasets/flags/GU.png": "651552f07c051f2782da0b34964956bf",
"assets/assets/images/small-open-datasets/flags/JE.png": "dc42623fd27c9d1dac43572068cc2ca8",
"assets/assets/images/small-open-datasets/flags/SG.png": "99500a4d3d4235b19d673a1323df665c",
"assets/assets/images/small-open-datasets/flags/PK.png": "90434eef951053f322b1f20e26f57990",
"assets/assets/images/small-open-datasets/flags/SR.png": "6a98847a38d12ea901b55f9dd79a091e",
"assets/assets/images/small-open-datasets/flags/SE.png": "bf84d225728a6536dfa8d1ba584b5b80",
"assets/assets/images/small-open-datasets/flags/JP.png": "f1429e23b55ae8ebb80d37be965de264",
"assets/assets/images/small-open-datasets/flags/GW.png": "9cd9166cc8ddcab8ec789bac0749f52f",
"assets/assets/images/small-open-datasets/flags/EH.png": "6a7555ca6e011a47fc9fb7133ac48099",
"assets/assets/images/small-open-datasets/flags/DZ.png": "fe2498b07f21be777364f202513a3d8d",
"assets/assets/images/small-open-datasets/flags/GA.png": "cc583bff885d32cc88ec497eaa44633c",
"assets/assets/images/small-open-datasets/flags/FR.png": "69c239f8985d65eec7b2137c8a526604",
"assets/assets/images/small-open-datasets/flags/DM.png": "5e27b60691565b04cd10221a5c2751a3",
"assets/assets/images/small-open-datasets/flags/HN.png": "7d61e332823c95e139ff94bc7d61b174",
"assets/assets/images/small-open-datasets/flags/SD.png": "6d36a799644a7de45cb9612ff6fe1d41",
"assets/assets/images/small-open-datasets/flags/RW.png": "dee38110b31c850e84521f4d68f0f8f2",
"assets/assets/images/small-open-datasets/flags/PH.png": "6df34511589cb22432bba85d3fdcf67a",
"assets/assets/images/small-open-datasets/flags/SS.png": "4ce90718e33a14061a58325ea073dd8f",
"assets/assets/images/small-open-datasets/flags/QA.png": "779727f01a87f789da361614a774d788",
"assets/assets/images/small-open-datasets/flags/PE.png": "963394254e94ef9f98cf3706d173fb09",
"assets/assets/images/small-open-datasets/flags/PR.png": "a13090015de87b23cdd4f00d8bfab8dc",
"assets/assets/images/small-open-datasets/flags/SI.png": "5418fec7e22c89037335a9201af91a7d",
"assets/assets/images/small-open-datasets/flags/HT.png": "c47a7d0db2ae4e2a8b3808c7cbdd75d5",
"assets/assets/images/small-open-datasets/flags/ES.png": "a56c3c38de274f7b27f23b64cb2884c7",
"assets/assets/images/small-open-datasets/flags/GL.png": "f297f6f63f4ca74f41ecd5a55198b763",
"assets/assets/images/small-open-datasets/flags/GM.png": "7089936ca145726f8597c9668b16eca6",
"assets/assets/images/small-open-datasets/flags/ER.png": "c3ec30aa1a40fea6edc48094770a49e5",
"assets/assets/images/small-open-datasets/flags/FI.png": "1960ab13e4f47a924ecf04ea72f36e69",
"assets/assets/images/small-open-datasets/flags/EE.png": "2744f2e560ebe807d5400cd6a50a8f93",
"assets/assets/images/small-open-datasets/flags/KN.png": "b5715f8884ad1c88d0fdcaa948f4da3f",
"assets/assets/images/small-open-datasets/flags/HU.png": "ae22370e49e01b8c02f5f6a07a72ed49",
"assets/assets/images/small-open-datasets/flags/IQ.png": "354c8a208ba69a6861c96a6f03747c65",
"assets/assets/images/small-open-datasets/flags/KY.png": "ed94d70ae1463a6e0d7e36e9e58a6451",
"assets/assets/images/small-open-datasets/flags/SH.png": "27161e8fa47a1763e65b46bbdbd52f17",
"assets/assets/images/small-open-datasets/flags/PS.png": "7c7ac86002cb21618be57e9cf253ac46",
"assets/assets/images/small-open-datasets/flags/PF.png": "e19a2233009340924a20e580ada5ea8a",
"assets/assets/images/small-open-datasets/flags/ID.png": "c271fb9ff6ce23024d79ad9e81234ae2",
"assets/assets/images/small-open-datasets/flags/IS.png": "34dd18d4f368928950760828cb586896",
"assets/assets/images/small-open-datasets/flags/EG.png": "c062e667685c8d8c5e3ec77e145a41cd",
"assets/assets/images/small-open-datasets/flags/FK.png": "5f0bbc4c38034475ff8950dfc4912fdd",
"assets/assets/images/small-open-datasets/flags/FJ.png": "550e957aed6c0ebc3140393ea0cd7f0d",
"assets/assets/images/small-open-datasets/flags/GN.png": "37a1b20c7e2ce12bf07f78ca873d794c",
"assets/assets/images/small-open-datasets/flags/GY.png": "0da5f9933b4d27bc92cadbecbae6ce03",
"assets/assets/images/small-open-datasets/flags/IR.png": "f6f587496e5e1ab6d9df26d05f21a9e9",
"assets/assets/images/small-open-datasets/flags/KM.png": "9090b6d0663df7d710d17ca2f2118434",
"assets/assets/images/small-open-datasets/flags/IE.png": "a09136a057edb1919fd715dfd0972ca3",
"assets/assets/images/small-open-datasets/flags/KZ.png": "238f8fb09c453fd658fc2d554893467b",
"assets/assets/images/small-open-datasets/flags/RO.png": "623a7705fa01312a62f7191e1d6082a9",
"assets/assets/images/small-open-datasets/flags/SK.png": "a7b2bd80fd984184a7ee35aacf294611",
"assets/assets/images/small-open-datasets/flags/PG.png": "e389c63e6224a14a2eedad7b8db08585",
"assets/assets/images/small-open-datasets/flags/PT.png": "49515f4f61c1f346540d8407540eeb7a",
"assets/assets/images/small-open-datasets/flags/SO.png": "3fe6ce2fd4ea8cbebd713acae94337b3",
"assets/assets/images/small-open-datasets/flags/SX.png": "38334efd4053a52208ab4b97c9c1bd9f",
"assets/assets/images/small-open-datasets/flags/HR.png": "872326a66cf612c1f91603181d5a4cd0",
"assets/assets/images/small-open-datasets/flags/KI.png": "c5594cb61b9d39dd1c75642483966128",
"assets/assets/images/small-open-datasets/flags/JM.png": "e56344aa4b7dea2905f3c84f8e239c2f",
"assets/assets/images/small-open-datasets/flags/EU.png": "06387afcdb4de735bc482d045c8cbb35",
"assets/assets/images/small-open-datasets/flags/EC.png": "9ef34e50b2dae837ccbbed1cdb5f7449",
"assets/assets/images/small-open-datasets/flags/ET.png": "14a4ba18e74ff02e3754d350ee016af3",
"assets/assets/images/small-open-datasets/flags/FO.png": "7087b65e3c6bf454e198ad95539108e6",
"assets/assets/images/small-open-datasets/flags/KH.png": "73528c9f3cfa382afc55504deccd9c85",
"assets/assets/images/small-open-datasets/flags/SY.png": "b2489fa5ef321aa22ee0c2859dfd0dae",
"assets/assets/images/small-open-datasets/flags/SN.png": "af1fae6833d71a4c08101dfe235f3b3e",
"assets/assets/images/small-open-datasets/flags/PW.png": "655006f9d1b5de61b1b375252ea7124a",
"assets/assets/images/small-open-datasets/flags/SL.png": "e00051f1a070699924fb28b2d9559130",
"assets/assets/images/small-open-datasets/flags/GB-ENG.png": "109c9c790f7adb090fac4fd6d0598af2",
"assets/assets/images/small-open-datasets/flags/FM.png": "36c66e8863691e1acd191cd6ba337b95",
"assets/assets/images/small-open-datasets/flags/GI.png": "716ead7d4c0a4ecf26966f056a583d09",
"assets/assets/images/small-open-datasets/flags/DE.png": "1ec7fd4ef91af1308dc625960e790563",
"assets/assets/images/small-open-datasets/flags/GH.png": "0d2cc4c6a952bb291715e893af51f0c4",
"assets/assets/images/small-open-datasets/flags/IC.png": "ea4c81a3b78208e9c55f3708f0ad7716",
"assets/assets/images/small-open-datasets/flags/JO.png": "15d8a051c64e9be03cb9ef739184bcb4",
"assets/assets/images/small-open-datasets/flags/IT.png": "8bd8030885af29d25e8fe49304dd24ec",
"assets/assets/images/small-open-datasets/flags/PA.png": "e1f654d12b33f2d735940f3d9c0ffde9",
"assets/assets/images/small-open-datasets/flags/SZ.png": "93767ae784e9582b8746588c3b233d96",
"assets/assets/images/small-open-datasets/flags/SM.png": "56c1990bcc94209aa07c76659bf6015a",
"assets/assets/images/small-open-datasets/flags/TN.png": "105585965fa3a4dde145c97a8efadbbd",
"assets/assets/images/small-open-datasets/flags/ML.png": "154f3688b0d8cf25cc23f9de3e6b062f",
"assets/assets/images/small-open-datasets/flags/CG.png": "671a71760e2032875201db4a2085730c",
"assets/assets/images/small-open-datasets/flags/AX.png": "166b1587f3df5eca0fd5f26a70d3356f",
"assets/assets/images/small-open-datasets/flags/AO.png": "c00a9cda710888411920c4fd5224144b",
"assets/assets/images/small-open-datasets/flags/BT.png": "f9dc3f7c7e1c9cd0011dbffea9d83f8a",
"assets/assets/images/small-open-datasets/flags/BB.png": "ddefeafb57f1770f14f363ca46ec9142",
"assets/assets/images/small-open-datasets/flags/CF.png": "02ac3f88bb3aa318dd30ffe2ba929262",
"assets/assets/images/small-open-datasets/flags/MM.png": "6393a729ae2d630ef85b95b41ca1e60d",
"assets/assets/images/small-open-datasets/flags/LI.png": "3a408bd90f5e78b7840f09e7d7f76c97",
"assets/assets/images/small-open-datasets/flags/NA.png": "8e7854e900e9989ba41df550231c0f90",
"assets/assets/images/small-open-datasets/flags/MZ.png": "102c7756fb63dd0cf9b2768f07c893bb",
"assets/assets/images/small-open-datasets/flags/TO.png": "d1284948c16d35ab8fcd4bc06e760636",
"assets/assets/images/small-open-datasets/flags/VG.png": "d3a2a5a2f84cce55c636251a87ca3bc4",
"assets/assets/images/small-open-datasets/flags/VE.png": "f83f7410f2fe316f6b8924950aff469a",
"assets/assets/images/small-open-datasets/flags/TZ.png": "deb06503b8bef345d7d4412e6725a86d",
"assets/assets/images/small-open-datasets/flags/TM.png": "b4981f2a878497bfcdbad8083c501bb9",
"assets/assets/images/small-open-datasets/flags/MX.png": "a5879b21f7e06e4bccc6e3b0e2c2a27b",
"assets/assets/images/small-open-datasets/flags/NC.png": "21d25a551b9520e3a685ddf4cdd97387",
"assets/assets/images/small-open-datasets/flags/MO.png": "a1ed39f917e9cefef59777bde73b9cbd",
"assets/assets/images/small-open-datasets/flags/LK.png": "6550473ffa4a96b4f5597599a20332de",
"assets/assets/images/small-open-datasets/flags/CD.png": "43a168eb5fcb1c8e18afd35d12ce5f9c",
"assets/assets/images/small-open-datasets/flags/AL.png": "47770778a6bddd116b69f29eefdee19e",
"assets/assets/images/small-open-datasets/flags/BW.png": "374cec34e092c93661ddab4f76c893f9",
"assets/assets/images/small-open-datasets/flags/CR.png": "02ef57bfc0bed84021193c56ba0261df",
"assets/assets/images/small-open-datasets/flags/AM.png": "2f7610ece68e5bd9c7b8d976b5f099eb",
"assets/assets/images/small-open-datasets/flags/AZ.png": "aec65509e86275090fd6c9e40ff2c2a7",
"assets/assets/images/small-open-datasets/flags/BA.png": "d805fc07402d3e8e0c5809c21b1ab979",
"assets/assets/images/small-open-datasets/flags/MN.png": "c8679f0ccdadafc082198470c6fe331e",
"assets/assets/images/small-open-datasets/flags/NU.png": "ff73ba900d6c26804f3eabe564b70446",
"assets/assets/images/small-open-datasets/flags/MY.png": "86f36f15566e15f8d1cfe62a4217d4dc",
"assets/assets/images/small-open-datasets/flags/TL.png": "12d16cf91f4501fc1ab663171ea3c1f7",
"assets/assets/images/small-open-datasets/flags/WS.png": "70cb81b7d0ed3bd92cc57be5bd727b11",
"assets/assets/images/small-open-datasets/flags/TH.png": "89db986a46728bff99353d4e7696fb7f",
"assets/assets/images/small-open-datasets/flags/XK.png": "2053f6d9cda05bf3685daf79e4ce8622",
"assets/assets/images/small-open-datasets/flags/NF.png": "d0bb12e589f7b921a1ac5e98fe58082d",
"assets/assets/images/small-open-datasets/flags/LY.png": "073e4c88b9d6c619b26bb6efe3dd182b",
"assets/assets/images/small-open-datasets/flags/AI.png": "21fc5dad3640828da41adbb158f33b02",
"assets/assets/images/small-open-datasets/flags/BR.png": "add31f905317084101dac8cd33ebb6d4",
"assets/assets/images/small-open-datasets/flags/CV.png": "991280d239d63f4cc7d1b7c3a3625c4e",
"assets/assets/images/small-open-datasets/flags/BE.png": "fea095c0b665ac157a422635207e409e",
"assets/assets/images/small-open-datasets/flags/CA.png": "e22e3b32a5cb576647ad7c008ad95ace",
"assets/assets/images/small-open-datasets/flags/BD.png": "9a1d72b0e8c25dbb0be7d1322df49be8",
"assets/assets/images/small-open-datasets/flags/CW.png": "17e11f25211bc3756426a9ca4cde43b4",
"assets/assets/images/small-open-datasets/flags/BS.png": "34facba328ea7df775dca1b8acc8cd0b",
"assets/assets/images/small-open-datasets/flags/NG.png": "d4f1ae67b3363a18dae44c60226c6c63",
"assets/assets/images/small-open-datasets/flags/OT.png": "27d7f02f2823b5afdf6395d1d5249825",
"assets/assets/images/small-open-datasets/flags/MK.png": "79c73e6e3c78470a120009103ca4551b",
"assets/assets/images/small-open-datasets/flags/NP.png": "6ed9329920f8f1dbe8d0a68601ff2f6b",
"assets/assets/images/small-open-datasets/flags/VA.png": "22f6eaae51ff8561d40fea7f296456fe",
"assets/assets/images/small-open-datasets/flags/UZ.png": "1b8031cae0b6ba4bdd9a4fc01e57524c",
"assets/assets/images/small-open-datasets/flags/TK.png": "2e468c7735c335412b0d415570506551",
"assets/assets/images/small-open-datasets/flags/VC.png": "5ebc85e713b94c8c7c9c3d41bb30a218",
"assets/assets/images/small-open-datasets/flags/ZW.png": "5b89768293b008dcae676947338e6802",
"assets/assets/images/small-open-datasets/flags/NR.png": "5ddcbbf9bbfe79e913092161ba5012e3",
"assets/assets/images/small-open-datasets/flags/NE.png": "f6aa5fe34881e520bef7e00e5bb3ea61",
"assets/assets/images/small-open-datasets/flags/CU.png": "a5549dcc7a72ea68bdf4313ca7d0891e",
"assets/assets/images/small-open-datasets/flags/BQ.png": "a2ab7c71d591b9459c563a6c779f4a8e",
"assets/assets/images/small-open-datasets/flags/BF.png": "04a0bb6c9b694b962567a32d286386a2",
"assets/assets/images/small-open-datasets/flags/BG.png": "e8a85fce76edc72a0a27fea5b69cb98e",
"assets/assets/images/small-open-datasets/flags/CC.png": "5eb21da83cc204389931c20f1af79565",
"assets/assets/images/small-open-datasets/flags/GB-WLS.png": "bfce04a24e578883fff21fc2b9eeab13",
"assets/assets/images/small-open-datasets/flags/MH.png": "abcd9e0a53c8636a1368f5c57c7cbbc7",
"assets/assets/images/small-open-datasets/flags/ZA.png": "5035a2205a649b6c5bcbb700c2ce674e",
"assets/assets/images/small-open-datasets/flags/UY.png": "076130cef041512b89aabf7a30092ea2",
"assets/assets/images/small-open-datasets/flags/WF.png": "95dd15668d88f6e9852e9153a7bc0cde",
"assets/assets/images/small-open-datasets/flags/UN.png": "24498179962de8a137593111ad695b3a",
"assets/assets/images/small-open-datasets/flags/VU.png": "2be2fd1d108a64ec66e6f2ebd25c1449",
"assets/assets/images/small-open-datasets/flags/TJ.png": "2ac4f6bb571924959836df1ccbb00563",
"assets/assets/images/heatwallet.png": "316a599bec6eb1d69e7ae13d01939f43",
"assets/assets/images/walletconnect-circle-blue.png": "c2237b68edc37fc579b4ea4b1e04de7b",
"assets/assets/images/receive.png": "0c793f4576f99cedf8eabf0f3a04a93e",
"assets/assets/images/home/home_news.png": "fd7e020f4551aa3274b6a19b65c9344f",
"assets/assets/images/home/home_message.png": "1df7707a47d0ecb9196ea55de43c12da",
"assets/assets/images/home/home_wallet.png": "192c769ff0763951622c91ce702df54c",
"assets/assets/images/drawer/home.png": "fb8e1380c067c708cd2f7a815f03f3a3",
"assets/assets/images/drawer/walletconnect.png": "28c4e5394ba8dc5f94d955322fbfec37",
"assets/assets/images/drawer/coupons.png": "6490feadd7eede31bbd5d7971235e026",
"assets/assets/images/drawer/restart_app_1.png": "c9cfc053bbb6f51ad572c673ce152cd6",
"assets/assets/images/drawer/staking.png": "5b0a67d580ac417c2182e1e96410305d",
"assets/assets/images/drawer/broadcast.png": "0e1c0b1e7c9276cf8c3836953cc4b9f6",
"assets/assets/images/exchange.png": "a3f79b354a7931d9e526efa82e95ff7e",
"assets/assets/images/importwallet/image1.png": "42946295c2a24f53b313981fab7a3cfb",
"assets/assets/images/importwallet/image2.png": "83e8b683851fdf7ae417126cfbe36ee6",
"assets/assets/images/importwallet/image3.png": "7bd0c8b38b3e51890796e366dafb4e03",
"assets/assets/images/buy_crypto.png": "3fa238a42199983455d487e6c4957994",
"assets/assets/images/shape/shape1.png": "debc7037bebb46cc256947acf0efce57",
"assets/assets/images/shape/shape3.png": "1015c75f51befcccca6b94b3cb92b40c",
"assets/assets/images/alert.svg": "3f0a07451294aebedcfd539a5f933141",
"assets/assets/images/active_option.svg": "0d84c860c0555e9a5d9d469e612ca053",
"assets/assets/images/recoveryphase/recovery_phase_complete.svg": "aff1bc42be3aa1d48a9c58898655a52d",
"assets/assets/images/copy_invite_link_image1.svg": "47ade75ceff8ab647194fcb76364472f",
"assets/assets/images/fimk_logo.png": "8a1da47c14d9ab92a7aeb30479d43ce9",
"assets/assets/images/app_launch_install_type_image1.svg": "87183d281e98a62e3d917a407bfb3f3f",
"assets/assets/images/importcreate/import_create_privatekey.png": "c0e2cd53d258b192a6a2e95e722e1572",
"assets/assets/images/importcreate/importcreate1.svg": "4d237d0129a5ddfee77034580d7b7916",
"assets/assets/images/importcreate/importcreate3.svg": "f2aa54cabbabcb36b34b9f2396153cc2",
"assets/assets/images/importcreate/importcreate2.svg": "d7f1a1397ac6eab79ee02380451765b3",
"assets/assets/images/importcreate/import_create_multicoin.png": "79a2006004278f25fd9d8dafa4b87c3f",
"assets/assets/images/importcreate/import_create_address.png": "e52d8c51348a092e77f8e518a2947b98",
"assets/assets/images/design_process.svg": "0d1875dde16d1698e162872c63c13ae5",
"assets/assets/images/empty_image.svg": "0b4717beef08b193a840c6ec42ed919d",
"assets/assets/images/placeholders/user_avatar.png": "1409f216d2230492a80d793aa2e889f2",
"assets/assets/images/placeholders/news_placeholder.png": "0842867785241ae49965a12daa32d02d",
"assets/assets/images/mobile_feed.svg": "465713759ae8622d7c8ab445d193b7b0",
"assets/assets/images/shopping_bag.png": "211b059be4357c4605ce2a8864ece259",
"assets/assets/images/recoverpharse.svg": "072eb3bc2c9090131985b18f9d060c78",
"assets/assets/images/choose.svg": "8b979b6b8ce6ccf540e9342ff5a19a62",
"assets/assets/images/message/message_doodle.png": "2e501523bff8ed84fca8de4c56ae5bfc",
"assets/assets/images/message/awaiting_response.png": "f2ace01d17c71092e78e640add9edc53",
"assets/assets/images/currency_received.png": "9d886491ed75cdebc181836dbe5a573a",
"assets/assets/images/throw_away.svg": "3ca89dc13a21c798d9dedecbe0df6120",
"assets/assets/images/walletconnect/connection_failed.svg": "16c5d82444f31a39073a5d859696373f",
"assets/assets/images/walletconnect/connection_success.svg": "fbb918d353ec68e3c4c477e1b0d612f3",
"assets/assets/images/icons/flash.png": "bb1b13c2343ddc53e5d13f516d2fb196",
"assets/assets/images/icons/discount.png": "17ecbd5c48b84fb81ec69b47dede7618",
"assets/assets/images/icons/icon_wallet.png": "e2e7ec2c0e7917363c9ab8d54d3dc13b",
"assets/assets/images/icons/payment/sepa_pay.png": "31c998a5624d323c15f9b856f53670ff",
"assets/assets/images/icons/payment/wire-transfer.png": "4746d0f85cb6697f41e7d44b4f5baf2b",
"assets/assets/images/icons/payment/credit-card.png": "3d35f6e135b8b18d16581da4edc21fa2",
"assets/assets/images/icons/payment/google-pay.png": "03a2392aa747f6787d14ff368177b2bc",
"assets/assets/images/icons/payment/apple-pay.png": "0521905ffb90b4d34317590b33c99546",
"assets/assets/images/icons/icon_view.png": "ee4aebd13d86aad801b8c5a9254ccab2",
"assets/assets/images/webfirstuse/web_first_use_welcome.png": "49b3c305f2b6301a27975dbe2e1e9773",
"assets/assets/images/webfirstuse/web_first_use_finish_1.png": "4d5a8eb81558aa8cbfa27c1599455c8e",
"assets/assets/images/webfirstuse/web_first_use_page_4_1.png": "3064d5385a24e5d81ae75d6abdd94346",
"assets/assets/images/webfirstuse/web_first_use_page_2_1.png": "843bb3979d76fd622f5b6237e71b141c",
"assets/assets/images/webfirstuse/web_first_use_page_3_1.png": "7a5cd51833b3e7b4a2257fdfce570b58",
"assets/assets/images/heatwallet.128x128.png": "e53324a2c6c368b63b4aeb9fcac2c4f8",
"assets/assets/images/heatwallet-ios.jpg": "29c1d2b9189420d9f35a08ac62a220f7",
"assets/assets/images/currency_sent.png": "2c5a84809174dd2670ba92c205dce787",
"assets/assets/images/success.png": "3365cc99818f42da970d34a5b9775177",
"assets/assets/images/currencysendstatus/currency_send_status_failed.png": "2a22e3697344dde0edd24c21744dc85d",
"assets/assets/images/currencysendstatus/currency_send_status_success.png": "5f4dbc734ffa37ff291e329e7a8ae02d",
"assets/assets/images/sync.svg": "290bc28e4290701f14d7d5569ff3db00",
"assets/assets/images/currencysendselecttarget/currencysendtarget2.png": "488ffe4b74b2772eca37f598009f4ebd",
"assets/assets/images/currencysendselecttarget/currencysendtarget1.png": "3b856c74b504e0a61359a20299f6a00f",
"assets/assets/images/avatars/bored-ape-2.jpeg": "70c71c42381ebf133114d942fa69db3e",
"assets/assets/images/avatars/bored-ape-3.png": "a04473913cb7e7d20bcf0e532632fa74",
"assets/assets/images/avatars/bored-ape-1.png": "d5767e1cb13cf712d45b8f7cd3e5e163",
"assets/assets/images/wallet_backup_required.svg": "9f74992ac230d21e2239d102c430cc80",
"assets/assets/images/permission/access_denied.svg": "7389e4332db3aff798a61e5ed7179a51",
"assets/assets/images/permission/notification.svg": "c8ea19c45c8d85a66ade8c105808cf68",
"assets/assets/images/permission/camera.svg": "3dd4c894836565590093cf89aa694628",
"assets/assets/images/permission/notfound.svg": "619e188db62a85f22f530aa4a5564d7d",
"assets/assets/images/confidential_letter.svg": "7317409e64294e81491bfecba9c05fdb",
"assets/assets/images/mobile_app.svg": "e6d5a1fd080e3c0a266ed49e1dc25745",
"assets/assets/images/deeplink/deeplink_page_4_extra_1.png": "368fda6558a47338c40d31f6b3d0ddcd",
"assets/assets/images/deeplink/deeplink_page_confirm_send_1.png": "6b8f4be9a386146936ca00f0fe133483",
"assets/assets/images/deeplink/deeplink_page_6_1.png": "4d5a8eb81558aa8cbfa27c1599455c8e",
"assets/assets/images/deeplink/deeplink_page_4_1.png": "7a5cd51833b3e7b4a2257fdfce570b58",
"assets/assets/images/deeplink/deeplink_page_2_1.png": "1380f273e2818080d30cdd982280954d",
"assets/assets/images/deeplink/deeplink_page_5_1.png": "3064d5385a24e5d81ae75d6abdd94346",
"assets/assets/images/deeplink/deeplink_page_3_1.png": "843bb3979d76fd622f5b6237e71b141c",
"assets/assets/images/deeplink/deeplink_page_5_extra_1.png": "6323921aa7b0f954fe4ac4e8d6be3263",
"assets/assets/images/deeplink/deeplink_page_1_1.png": "07f3d6d2b56d9685c88b65faa5a41900",
"assets/assets/images/blockchains/litecoin.png": "6b9afb3a15b9f5360b4fd9f0f08036d3",
"assets/assets/images/blockchains/bitcoin.png": "7dd73ad00a4365f001e3a678593c50b6",
"assets/assets/images/blockchains/dogecoin.png": "9c34cbf6a05bd4d0bc83a02ec8b1c356",
"assets/assets/images/blockchains/ethereum.png": "62cb16a2e607c740db59bbad158a2ecd",
"assets/assets/images/exclamation.svg": "283bda7e501c0f961390c1e729e3578d",
"assets/assets/images/gif/lockunlock.gif": "80b6587463cbebcf3251b74d34ea9b38",
"assets/assets/images/gif/giflogin.gif": "80b6587463cbebcf3251b74d34ea9b38",
"assets/assets/js/index.html": "a4003241c768d3a08b6eb5eeae1b0cd8",
"assets/assets/js/index.js": "3d32f6b05a2fc2f2cbfc1feb95a428ee",
"assets/assets/fiat_currencies.compressed.json": "6a24a22f753655811f19b56a511ff5d8",
"assets/assets/flavor/logo.png": "67d97f0941ff6a92b6a35b16b09f4ab3",
"assets/assets/flavor/logo.png.ORIGINAL.png": "316a599bec6eb1d69e7ae13d01939f43",
"assets/assets/flavor/logo-ios.png": "9c2b164ab064f179001aa42b005a37fa",
"assets/assets/flavor/logo-ios.jpg": "29c1d2b9189420d9f35a08ac62a220f7",
"assets/assets/flavor/web-install-ios.png": "9fd34fb3f872feed63944ed03626eb8c",
"assets/assets/asset-registry.json": "e50cbae7fbbff7f34b2f9ed4d2e30505",
"assets/assets/fonts/GraphikRegular.otf": "e2a1876e68b3885d03062214bc6016e9",
"service-worker-indexeddb.js": "b50c2e42cc025afaad79c605c9fb23a4",
"jsQR.min.js": "d05e0bd4ba291ea8ea7136f907d129b8",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
