# Envelhecer com Saúde — versão em página única

Cartilha digital estática e sequencial para ações de educação em saúde na sala de espera da UBS. Pensada para tablets durante a apresentação e para celulares após o acesso por QR Code.

## Como abrir

1. Extraia **todo** o conteúdo do arquivo ZIP, sem separar `index.html` da pasta `assets/`.
2. Abra `index.html` em um navegador. As imagens e interações básicas funcionam sem internet se os arquivos estiverem no dispositivo.
3. Para uso público por QR Code, publique **toda a pasta** em uma hospedagem de sites estáticos (por exemplo, GitHub Pages ou Netlify). O QR Code só poderá ser criado depois de obter o endereço definitivo.

## Apresentação nos tablets

- Abra a página e toque em **Modo apresentação**, no canto superior: fontes maiores e controles fixos na parte inferior.
- Use **Próxima** e **Anterior** para alternar entre os grandes temas; o conteúdo de cada tema permanece em rolagem vertical.
- O menu horizontal superior dá acesso direto a qualquer tema, inclusive à sarcopenia por meio da área de atividade física.
- O botão **A+** amplia a tipografia. Os valores nutricionais ficam escondidos até selecionar *Ver informações nutricionais*.
- No teclado, durante o modo apresentação, `PageDown`/`→` avançam e `PageUp`/`←` retornam; `Esc` sai do modo.
- Os filtros de refeições e o checklist de prevenção de quedas continuam interativos.

## Funcionamento sem conexão

- A pasta inteira pode ser copiada previamente para o tablet, e o arquivo `index.html` pode ser aberto localmente com as imagens disponíveis. Alguns navegadores móveis limitam a abertura de arquivos locais; nesse caso, use hospedagem ou ambiente local de arquivos compatível.
- Quando publicado em **HTTPS**, o arquivo `sw.js` guarda em cache o conteúdo da cartilha após a **primeira visita concluída online**. A funcionalidade offline deve ser testada **no tablet real** antes do dia da ação. Links externos para fontes oficiais necessitam de internet.
- Para atualizações publicadas após a primeira versão, modifique a versão do cache em `sw.js` para forçar a atualização dos arquivos armazenados.

## Organização da entrega

- `index.html`: página principal, com todos os temas em sequência.
- `assets/css/style.css`: estilo da versão original.
- `assets/css/pagina-unica.css`: adaptações para tablet, navegação e modo apresentação.
- `assets/js/site.js`: filtros, tamanho do texto e checklist.
- `assets/js/pagina-unica.js`: navegação entre temas, modo apresentação e cache.
- `assets/img/`: ilustrações e fotografias geradas para a cartilha.
- `dados/`: fichas nutricionais e lista provisória de serviços (arquivos de trabalho, não carregados automaticamente).
- `sw.js` e `manifest.webmanifest`: suporte básico a carregamento offline após visita inicial e instalação opcional.

## Pendências para publicação institucional

1. Preencher nome da faculdade, UBS, endereço, contatos e **lista oficialmente confirmada** de serviços da unidade. Não divulgar serviços provisórios como se estivessem disponíveis.
2. Validar as estimativas nutricionais das dez fichas com um profissional habilitado (quantidades, preparações, fontes e revisão dos valores).
3. Revisar clinicamente o texto e as imagens, incluindo sarcopenia e orientações sobre exercícios e segurança.
4. Conferir o calendário oficial de vacinação mais recente na data de publicação e atualizar referências se necessário.
5. Testar legibilidade, navegação, responsividade e uso offline **nos tablets concretos** utilizados no projeto, inclusive orientação de tela vertical e horizontal.
6. Após publicação, gerar o QR Code para o endereço definitivo e testá-lo com celulares.

**Importante:** Conteúdo educativo geral; não é uma prescrição clínica ou alimentar individual. Nenhum formulário solicita ou envia dados pessoais.
