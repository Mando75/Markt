export default (
  playerName: string,
  guideName: string,
  playerCode: string
) => `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
    <!--[if gte mso 9]><xml>
     <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
     </o:OfficeDocumentSettings>
    </xml><![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>
    <!--[if !mso]><!-- -->
	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css">
	<!--<![endif]-->

    <style type="text/css" id="media-query">
      body {
  margin: 0;
  padding: 0; }

table, tr, td {
  vertical-align: top;
  border-collapse: collapse; }

.ie-browser table, .mso-container table {
  table-layout: fixed; }

* {
  line-height: inherit; }

a[x-apple-data-detectors=true] {
  color: inherit !important;
  text-decoration: none !important; }

[owa] .img-container div, [owa] .img-container button {
  display: block !important; }

[owa] .fullwidth button {
  width: 100% !important; }

[owa] .block-grid .col {
  display: table-cell;
  float: none !important;
  vertical-align: top; }

.ie-browser .num12, .ie-browser .block-grid, [owa] .num12, [owa] .block-grid {
  width: 700px !important; }

.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
  line-height: 100%; }

.ie-browser .mixed-two-up .num4, [owa] .mixed-two-up .num4 {
  width: 232px !important; }

.ie-browser .mixed-two-up .num8, [owa] .mixed-two-up .num8 {
  width: 464px !important; }

.ie-browser .block-grid.two-up .col, [owa] .block-grid.two-up .col {
  width: 350px !important; }

.ie-browser .block-grid.three-up .col, [owa] .block-grid.three-up .col {
  width: 233px !important; }

.ie-browser .block-grid.four-up .col, [owa] .block-grid.four-up .col {
  width: 175px !important; }

.ie-browser .block-grid.five-up .col, [owa] .block-grid.five-up .col {
  width: 140px !important; }

.ie-browser .block-grid.six-up .col, [owa] .block-grid.six-up .col {
  width: 116px !important; }

.ie-browser .block-grid.seven-up .col, [owa] .block-grid.seven-up .col {
  width: 100px !important; }

.ie-browser .block-grid.eight-up .col, [owa] .block-grid.eight-up .col {
  width: 87px !important; }

.ie-browser .block-grid.nine-up .col, [owa] .block-grid.nine-up .col {
  width: 77px !important; }

.ie-browser .block-grid.ten-up .col, [owa] .block-grid.ten-up .col {
  width: 70px !important; }

.ie-browser .block-grid.eleven-up .col, [owa] .block-grid.eleven-up .col {
  width: 63px !important; }

.ie-browser .block-grid.twelve-up .col, [owa] .block-grid.twelve-up .col {
  width: 58px !important; }

@media only screen and (min-width: 720px) {
  .block-grid {
    width: 700px !important; }
  .block-grid .col {
    vertical-align: top; }
    .block-grid .col.num12 {
      width: 700px !important; }
  .block-grid.mixed-two-up .col.num4 {
    width: 232px !important; }
  .block-grid.mixed-two-up .col.num8 {
    width: 464px !important; }
  .block-grid.two-up .col {
    width: 350px !important; }
  .block-grid.three-up .col {
    width: 233px !important; }
  .block-grid.four-up .col {
    width: 175px !important; }
  .block-grid.five-up .col {
    width: 140px !important; }
  .block-grid.six-up .col {
    width: 116px !important; }
  .block-grid.seven-up .col {
    width: 100px !important; }
  .block-grid.eight-up .col {
    width: 87px !important; }
  .block-grid.nine-up .col {
    width: 77px !important; }
  .block-grid.ten-up .col {
    width: 70px !important; }
  .block-grid.eleven-up .col {
    width: 63px !important; }
  .block-grid.twelve-up .col {
    width: 58px !important; } }

@media (max-width: 720px) {
  .block-grid, .col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important; }
  .block-grid {
    width: calc(100% - 40px) !important; }
  .col {
    width: 100% !important; }
    .col > div {
      margin: 0 auto; }
  img.fullwidth, img.fullwidthOnMobile {
    max-width: 100% !important; }
  .no-stack .col {
    min-width: 0 !important;
    display: table-cell !important; }
  .no-stack.two-up .col {
    width: 50% !important; }
  .no-stack.mixed-two-up .col.num4 {
    width: 33% !important; }
  .no-stack.mixed-two-up .col.num8 {
    width: 66% !important; }
  .no-stack.three-up .col.num4 {
    width: 33% !important; }
  .no-stack.four-up .col.num3 {
    width: 25% !important; }
  .mobile_hide {
    min-height: 0px;
    max-height: 0px;
    max-width: 0px;
    display: none;
    overflow: hidden;
    font-size: 0px; } }

    </style>
</head>
<body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #FFFFFF">
  <style type="text/css" id="media-query-bodytag">
    @media (max-width: 520px) {
      .block-grid {
        min-width: 320px!important;
        max-width: 100%!important;
        width: 100%!important;
        display: block!important;
      }

      .col {
        min-width: 320px!important;
        max-width: 100%!important;
        width: 100%!important;
        display: block!important;
      }

        .col > div {
          margin: 0 auto;
        }

      img.fullwidth {
        max-width: 100%!important;
      }
			img.fullwidthOnMobile {
        max-width: 100%!important;
      }
      .no-stack .col {
				min-width: 0!important;
				display: table-cell!important;
			}
			.no-stack.two-up .col {
				width: 50%!important;
			}
			.no-stack.mixed-two-up .col.num4 {
				width: 33%!important;
			}
			.no-stack.mixed-two-up .col.num8 {
				width: 66%!important;
			}
			.no-stack.three-up .col.num4 {
				width: 33%!important;
			}
			.no-stack.four-up .col.num3 {
				width: 25%!important;
			}
      .mobile_hide {
        min-height: 0px!important;
        max-height: 0px!important;
        max-width: 0px!important;
        display: none!important;
        overflow: hidden!important;
        font-size: 0px!important;
      }
    }
  </style>
  <!--[if IE]><div class="ie-browser"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #FFFFFF;width: 100%" cellpadding="0" cellspacing="0">
	<tbody>
	<tr style="vertical-align: top">
		<td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #FFFFFF;"><![endif]-->

    <div style="background-color:#FFFFFF;">
      <div style="Margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#FFFFFF;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 700px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->

              <!--[if (mso)|(IE)]><td align="center" width="700" style=" width:700px; padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
            <div class="col num12" style="min-width: 320px;max-width: 700px;display: table-cell;vertical-align: top;">
              <div style="background-color: transparent; width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->



<table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
        <tr style="vertical-align: top">
            <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 0px;padding-left: 0px;padding-top: 0px;padding-bottom: 0px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                <table class="divider_content" height="30px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <tbody>
                        <tr style="vertical-align: top">
                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 30px;line-height: 30px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <span>&#160;</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    <div style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/286/bg_wave_1.png');background-position:top center;background-repeat:repeat;;background-color:#F4F4F4">
      <div style="Margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/286/bg_wave_1.png');background-position:top center;background-repeat:repeat;;background-color:#F4F4F4" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 700px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->

              <!--[if (mso)|(IE)]><td align="center" width="700" style=" width:700px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
            <div class="col num12" style="min-width: 320px;max-width: 700px;display: table-cell;vertical-align: top;">
              <div style="background-color: transparent; width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->



<table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
        <tr style="vertical-align: top">
            <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 10px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                <table class="divider_content" height="70px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <tbody>
                        <tr style="vertical-align: top">
                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 70px;line-height: 70px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <span>&#160;</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    <div style="background-color:#F4F4F4;">
      <div style="Margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#F4F4F4;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 700px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->

              <!--[if (mso)|(IE)]><td align="center" width="700" style=" width:700px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
            <div class="col num12" style="min-width: 320px;max-width: 700px;display: table-cell;vertical-align: top;">
              <div style="background-color: transparent; width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->


                    <div class="">
	<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 10px; padding-bottom: 0px;"><![endif]-->
	<div style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:120%; padding-right: 30px; padding-left: 30px; padding-top: 10px; padding-bottom: 0px;">
		<div style="font-size:12px;line-height:14px;font-family:Montserrat, 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;color:#555555;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 17px"><strong><span style="font-size: 46px; line-height: 55px;">Welcome, <span style="color: #3d3bee;">${playerName}</span>!</span></strong></p></div>
	</div>
	<!--[if mso]></td></tr></table><![endif]-->
</div>


                    <div class="">
	<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 15px; padding-bottom: 5px;"><![endif]-->
	<div style="color:#555555;font-family:'Open Sans', Helvetica, Arial, sans-serif;line-height:150%; padding-right: 30px; padding-left: 30px; padding-top: 15px; padding-bottom: 5px;">
		<div style="font-size:12px;line-height:18px;color:#555555;font-family:'Open Sans', Helvetica, Arial, sans-serif;text-align:left;"><p style="margin: 0;font-size: 12px;line-height: 18px"><strong><span style="font-size: 20px; line-height: 30px;">Are you ready to play? You've been invited by ${guideName} to join Markt!</span></strong></p></div>
	</div>
	<!--[if mso]></td></tr></table><![endif]-->
</div>

              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    <div style="background-color:#F4F4F4;">
      <div style="Margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#F4F4F4;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 700px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->

              <!--[if (mso)|(IE)]><td align="center" width="700" style=" width:700px; padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
            <div class="col num12" style="min-width: 320px;max-width: 700px;display: table-cell;vertical-align: top;">
              <div style="background-color: transparent; width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;"><!--<![endif]-->


                    <div class="">
	<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
	<div style="color:#555555;line-height:120%;font-family:'Open Sans', Helvetica, Arial, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">
		<div style="line-height:14px;font-size:12px;color:#555555;font-family:'Open Sans', Helvetica, Arial, sans-serif;text-align:left;"><p style="margin: 0;line-height: 14px;font-size: 12px"><span style="font-size: 16px; line-height: 19px;">Your player code is <span style="font-size: 22px; line-height: 26px;"><strong>${playerCode}</strong><span style="font-size: 18px; line-height: 21px;">. Keep this handy, you'll need it to join experiments!&#160;</span></span></span></p><p style="margin: 0;line-height: 14px;font-size: 12px"><span style="font-size: 16px; line-height: 19px;"><span style="font-size: 22px; line-height: 26px;"><span style="font-size: 18px; line-height: 21px;">Are you ready to join a game? Click the link below to get started!</span></span></span></p></div>
	</div>
	<!--[if mso]></td></tr></table><![endif]-->
</div>

              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    <div style="background-color:#F4F4F4;">
      <div style="Margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#F4F4F4;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 700px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->

              <!--[if (mso)|(IE)]><td align="center" width="700" style=" width:700px; padding-right: 0px; padding-left: 0px; padding-top:25px; padding-bottom:60px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
            <div class="col num12" style="min-width: 320px;max-width: 700px;display: table-cell;vertical-align: top;">
              <div style="background-color: transparent; width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:25px; padding-bottom:60px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->



<div align="center" class="button-container center " style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;">
  <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://markt-dev.herokuapp.com/join" style="height:54pt; v-text-anchor:middle; width:243pt;" arcsize="13%" strokecolor="#3D3BEE" fillcolor="#3D3BEE"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:'Open Sans', Helvetica, Arial, sans-serif; font-size:26px;"><![endif]-->
    <a href="${
      process.env.HOST
    }/join" target="_blank" style="display: block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #3D3BEE; border-radius: 9px; -webkit-border-radius: 9px; -moz-border-radius: 9px; max-width: 324px; width: 234px;width: auto; border-top: 0px solid transparent; border-right: 0px solid transparent; border-bottom: 0px solid transparent; border-left: 0px solid transparent; padding-top: 10px; padding-right: 45px; padding-bottom: 10px; padding-left: 45px; font-family: 'Open Sans', Helvetica, Arial, sans-serif;mso-border-alt: none">
      <span style="font-family:'Open Sans', Helvetica, Arial, sans-serif;font-size:16px;line-height:32px;"><span style="font-size: 26px; line-height: 52px;"><strong>JOIN A GAME NOW</strong></span></span>
    </a>
  <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
</div>


              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    <div style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/286/bg_wave_2.png');background-position:top center;background-repeat:repeat;;background-color:#F4F4F4">
      <div style="Margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-image:url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/286/bg_wave_2.png');background-position:top center;background-repeat:repeat;;background-color:#F4F4F4" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 700px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->

              <!--[if (mso)|(IE)]><td align="center" width="700" style=" width:700px; padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
            <div class="col num12" style="min-width: 320px;max-width: 700px;display: table-cell;vertical-align: top;">
              <div style="background-color: transparent; width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->



<table border="0" cellpadding="0" cellspacing="0" width="100%" class="divider " style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
        <tr style="vertical-align: top">
            <td class="divider_inner" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;padding-right: 10px;padding-left: 10px;padding-top: 10px;padding-bottom: 10px;min-width: 100%;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                <table class="divider_content" height="70px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid transparent;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <tbody>
                        <tr style="vertical-align: top">
                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 70px;line-height: 70px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                <span>&#160;</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    <div style="background-color:#FFFFFF;">
      <div style="Margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #FFFFFF;" class="block-grid ">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:#FFFFFF;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 700px;"><tr class="layout-full-width" style="background-color:#FFFFFF;"><![endif]-->

              <!--[if (mso)|(IE)]><td align="center" width="700" style=" width:700px; padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:35px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
            <div class="col num12" style="min-width: 320px;max-width: 700px;display: table-cell;vertical-align: top;">
              <div style="background-color: transparent; width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:15px; padding-bottom:35px; padding-right: 0px; padding-left: 0px;"><!--<![endif]-->


                    <div class="">
	<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;"><![endif]-->
	<div style="color:#838383;font-family:'Open Sans', Helvetica, Arial, sans-serif;line-height:150%; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">
		<div style="font-size:12px;line-height:18px;color:#838383;font-family:'Open Sans', Helvetica, Arial, sans-serif;text-align:left;"><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"><span style="font-family: inherit; background-color: transparent; font-size: 14px; line-height: 21px;"><span style="color: #000000;"><strong>Markt - Online Economics Games</strong></span></span></p><p style="margin: 0;font-size: 14px;line-height: 21px;text-align: center"><span style="font-family: inherit; background-color: transparent; font-size: 14px; line-height: 21px;">Rexburg, ID&#160;</span></p></div>
	</div>
	<!--[if mso]></td></tr></table><![endif]-->
</div>

              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
   <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
		</td>
  </tr>
  </tbody>
  </table>
  <!--[if (mso)|(IE)]></div><![endif]-->


</body></html>`;
