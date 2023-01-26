const data = [
    {
        id:1,
        category:"spinners",
        loaders:[
            {
                id: 1,
                HTML:"<div class="custom-loader"></div>",
                CSS:".custom-loader {
                        width:50px;
                        height:50px;
                        border-radius:50%;
                        border:8px solid;
                        border-color:#766DF4 #0000;
                        animation:s1 1s infinite;
                        }
                        @keyframes s1 {to{transform: rotate(.5turn)}}"
            },

            {
                id:2, 
                HTML:"<div class="custom-loader"></div>",
                CSS:".custom-loader {
                        width:50px;
                        height:50px;
                        border-radius:50%;
                        border:8px solid;
                        border-color:#E4E4ED;
                        border-right-color: #766DF4;
                        animation:s2 1s infinite linear;
                        }
                        @keyframes s2 {to{transform: rotate(1turn)}}"
            },

            {
                id:3,
                HTML:"<div class="custom-loader"></div>",
                CSS:".custom-loader {
                        width:50px;
                        height:50px;
                        border-radius:50%;
                        background:conic-gradient(#0000 10%,#766DF4);
                        -webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
                        animation:s3 1s infinite linear;
                        }
                        @keyframes s3 {to{transform: rotate(1turn)}}"
            },

            {
                id:4,
                HTML:"<div class="custom-loader"></div>",
                CSS:".custom-loader {
                width:50px;
                height:50px;
                border-radius:50%;
                padding:3px;
                background: 
                    radial-gradient(farthest-side,#766DF4 95%,#0000) 50% 0/12px 12px no-repeat,
                    radial-gradient(farthest-side,#0000 calc(100% - 5px),#766DF4 calc(100% - 4px)) content-box;
                animation:s6 2s infinite ;
                }
                @keyframes s6 {to{transform: rotate(1turn)}}"
            },

            {
                id:5,
                HTML:"<div class="custom-loader"></div>",
                CSS:".custom-loader {
                    width:50px;
                    height:50px;
                    --c:radial-gradient(farthest-side,#766DF4 92%,#0000);
                    background: 
                        var(--c) 50% 0,
                        var(--c) 50% 100%,
                        var(--c) 100% 50%,
                        var(--c) 0    50%;
                    background-size:12px 12px;
                    background-repeat:no-repeat;
                    animation:s7 1s infinite;
                    }
                    @keyframes s7 {to{transform: rotate(.5turn)}}"
            },

            {
                id:6,
                HTML:"<div class="custom-loader"></div>",
                CSS:".custom-loader {
                        width:50px;
                        height:50px;
                        color:#766DF4;
                        --c:radial-gradient(farthest-side,currentColor 92%,#0000);
                        background: 
                            var(--c) 50% 0   /12px 12px,
                            var(--c) 50% 100%/12px 12px,
                            var(--c) 100% 50%/12px 12px,
                            var(--c) 0    50%/12px 12px,
                            var(--c) 50%  50%/12px 12px,
                            linear-gradient(currentColor 0 0) 50% 50%/4px 100%,
                            linear-gradient(currentColor 0 0) 50% 50%/100% 4px;
                        background-repeat:no-repeat;
                        animation:s8 1s infinite linear;
                        }
                        @keyframes s8 {to{transform: rotate(.5turn)}}"
            },


        ]
    },


    {
        id:2,
        category:"dot Loaders",
        loaders:[
            
        ]
    }
]