// anakategori / subkategori / ürünler -> içinde parent kategori ve main kategori de eklenecek!

export const allCategories = [
  {
    value: "ayakkabı",
    label: "Ayakkabı",
    categories: [
      {
        value: "erkek-ayakkabi",
        label: "Erkek Ayakkabı",
        items: [
          {
            value: "sneaker",
            label: "Sneaker",
            parent: {
              value: "erkek-ayakkabi",
              label: "Erkek Ayakkabı",
            },
            main: {
              value: "ayakkabi",
              label: "Ayakkabı",
            }
          },
          {
            value: "spor-ve-outdoor-ayakkabi",
            label: "Spor ve Outdoor Ayakkabı",
          },
          {
            value: "duz-ayakabi",
            label: "Düz Ayakkabı",
          },
          {
            value: "cizme-ve-bot",
            label: "Çizme ve Bot",
          },
          {
            value: "sandalet",
            label: "Sandalet",
          },
          {
            value: "ev-terligi",
            label: "Ev Terliği",
          },
          {
            value: "erkek-ayakabi",
            label: "Erkek Ayakkabı",
          },
        ],
      },
      {
        value: "kadin-ayakkabi",
        label: "Kadın Ayakkabı",
        items: [
          {
            value: "sneaker",
            label: "Sneaker",
          },
          {
            value: "spor-ve-outdoor-ayakkabi",
            label: "Spor ve Outdoor Ayakkabı",
          },
          {
            value: "duz-ayakabi",
            label: "Düz Ayakkabı",
          },
          {
            value: "cizme-ve-bot",
            label: "Çizme ve Bot",
          },
          {
            value: "sandalet",
            label: "Sandalet",
          },
          {
            value: "ev-terligi",
            label: "Ev Terliği",
          },
          {
            value: "kadin-ayakabi",
            label: "Kadın Ayakkabı",
          },
        ],
      },
      {
        value: "erkek-cocuk-ayakkabi",
        label: "Erkek Çocuk Ayakkabı",
        items: [
          {
            value: "sneaker",
            label: "Sneaker",
          },
          {
            value: "spor-ve-outdoor-ayakkabi",
            label: "Spor ve Outdoor Ayakkabı",
          },
          {
            value: "cizme-ve-bot",
            label: "Çizme ve Bot",
          },
          {
            value: "sandalet",
            label: "Sandalet",
          },
          {
            value: "erkek-cocuk-ayakabi",
            label: "Erkek Çocuk Ayakkabı",
          },
        ],
      },
      {
        value: "kiz-cocuk-ayakkabi",
        label: "Kız Çocuk Ayakkabı",
        items: [
          {
            value: "sneaker",
            label: "Sneaker",
          },
          {
            value: "spor-ve-outdoor-ayakkabi",
            label: "Spor ve Outdoor Ayakkabı",
          },
          {
            value: "cizme-ve-bot",
            label: "Çizme ve Bot",
          },
          {
            value: "sandalet",
            label: "Sandalet",
          },
          {
            value: "kiz-cocuk-ayakabi",
            label: "Kiz Çocuk Ayakkabı",
          },
        ],
      },
      {
        value: "bebek-ayakkabi",
        label: "Bebek Ayakkabı",
        items: [
          {
            value: "kiz-bebek-ayakabi",
            label: "Kız Bebek Ayakabı",
          },
          {
            value: "erkek-bebek-ayakabi",
            label: "Erkek Bebek Ayakabı",
          },
        ],
      },
    ],
  },
  {
    value: "bahce",
    label: "Bahçe",
    
  },
  {
    value: "bebek",
    label: "Bebek",
  },
  {
    value: "pc",
    label: "Bilgisayar",
    categories: [
      {
        value: "bilgisayar",
        label: "Bilgisayar",
        items: [
          {
            value: "diz-ustu-bilgisayarlar",
            label: "Diz Üstü Bilgisayarlar",
          },
          {
            value: "masa-ustu-bilgisayarlar",
            label: "Diz Üstü Bilgisayarlar",
          },
          {
            value: "tabletler",
            label: "Tabletler",
          },
          {
            value: "monitorler",
            label: "Monitörler",
          },
          {
            value: "oyun-bilgisayarlari",
            label: "Oyun Bilgisayarları",
          },
          {
            value: "video-oyun-konsol",
            label: "Video Oyun ve Konsol",
          },
        ],
      },
      {
        value: "bilgisayar-bilesenleri",
        label: "bilgisayar Bileşenleri",
        items: [
          {
            value: "ekran-kartlari",
            label: "Ekran Kartları",
          },
          {
            value: "bellekler",
            label: "Bellekler",
          },
          {
            value: "bilgisayar-kasalari",
            label: "Bilgisayar Kasaları",
          },
          {
            value: "anakartlar",
            label: "Anakartlar",
          },
          {
            value: "islemciler",
            label: "İşlemciler",
          },
          {
            value: "bilgisayar-bilesenleri-genel",
            label: "Bilgisayar Bileşenleri",
          },
        ],
      },
      {
        value: "bilgisayar-aksesuarlari",
        label: "Bilgisayar Aksesuarları",
        items: [
          {
            value: "klavye",
            label: "Klavye",
          },
          {
            value: "mouse",
            label: "Mause",
          },
          {
            value: "sirt-cantasi",
            label: "Sırt Çantası",
          },
          {
            value: "koruyucu-kilif",
            label: "Koruyucu Kılıf",
          },
          {
            value: "bilgisayar-kulakliklari",
            label: "Bilgisayar Kulaklıkları",
          },
        ],
      },
      {
        value: "veri-depolama",
        label: "Veri Depolama",
        items: [
          {
            value: "usb-bellek",
            label: "Usb Bellek",
          },
          {
            value: "dahili-ssd",
            label: "Dahili SSD",
          },
          {
            value: "harici-depolama-cihazlari",
            label: "Harici Depolama Cihazları",
          },
          {
            value: "dahili-sabit-sürücü",
            label: "Dahili Sabit Sürücüler",
          },
          {
            value: "veri-depolama-genel",
            label: "Veri Depolama",
          },
        ],
      },
    ],
  },
  {
    value: "elektronik",
    label: "Elektronik",
    categories: [
      {
        value: "elektronik",
        label: "Elektronik",
        items: [
          {
            value: "bilgisayar",
            label: "Bilgisayar",
          },
          {
            value: "cep-telefonu-ve-aksesuarlari",
            label: "Cep Telefonu ve Aksesusarları",
          },
          {
            value: "televizyonlar-ve-ev-sinema-sistemleri",
            label: "Televizyonlar ve Ev Sinema Sistemleri",
          },
          {
            value: "kulakliklar",
            label: "Kulaklıklar",
          },
          {
            value: "akilli-saatler",
            label: "Akıllı Saatler",
          },
          {
            value: "kameralar-ve-fotograf-makinasi",
            label: "Kameralar ve Fotoğraf Makinaları",
          },
          {
            value: "tasinabilir-hoparlorler",
            label: "Taşınabilir Hoparlörler",
          },
          {
            value: "elektirkli-ev-ve-mutfak-aletleri",
            label: "Elektrikli Ev ve Mutfak Aletleri",
          },
          {
            value: "oto-ve-arac-elektronigi",
            label: "Oto ve Araç Elektroniği",
          },
          {
            value: "piller-ve-pil-sarj-aletleri",
            label: "Piller ve Pil Şarj Aletleri",
          },
        ],

      },
    ],
  },
  {
    value: "ev-ve-yasam",
    label: "Ev ve Yaşam",
  }
];


