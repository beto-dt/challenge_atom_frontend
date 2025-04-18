'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">tareas-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-07adf8deb709ad3e8653e8ab75583fcb27c905e99984cf3b408ef9d9051f02057590542948d5d0bba7490660466d47e46d818d460ba1aeaf55103fc69e3bba7a"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-07adf8deb709ad3e8653e8ab75583fcb27c905e99984cf3b408ef9d9051f02057590542948d5d0bba7490660466d47e46d818d460ba1aeaf55103fc69e3bba7a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-07adf8deb709ad3e8653e8ab75583fcb27c905e99984cf3b408ef9d9051f02057590542948d5d0bba7490660466d47e46d818d460ba1aeaf55103fc69e3bba7a"' :
                                        'id="xs-injectables-links-module-AuthModule-07adf8deb709ad3e8653e8ab75583fcb27c905e99984cf3b408ef9d9051f02057590542948d5d0bba7490660466d47e46d818d460ba1aeaf55103fc69e3bba7a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthFacade</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CoreModule-8190fe3c305fcada61ad9bd2dba1577868523e6b63bddf4337891d1281c8fc5a32d105b513893e4cd4bef7da995d9dc3da128226cf233e58ec8c3da9f1dbeffc"' : 'data-bs-target="#xs-injectables-links-module-CoreModule-8190fe3c305fcada61ad9bd2dba1577868523e6b63bddf4337891d1281c8fc5a32d105b513893e4cd4bef7da995d9dc3da128226cf233e58ec8c3da9f1dbeffc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-8190fe3c305fcada61ad9bd2dba1577868523e6b63bddf4337891d1281c8fc5a32d105b513893e4cd4bef7da995d9dc3da128226cf233e58ec8c3da9f1dbeffc"' :
                                        'id="xs-injectables-links-module-CoreModule-8190fe3c305fcada61ad9bd2dba1577868523e6b63bddf4337891d1281c8fc5a32d105b513893e4cd4bef7da995d9dc3da128226cf233e58ec8c3da9f1dbeffc"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HttpBaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HttpBaseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStorageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStorageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-59cf5bedd0bcfaf117f60a857526fdefd09ec89c526ff4b31b33566261746adacf231f1e410c1a3a9ce69bd1ea4c93db2653ee9653b16b5d544db6d073460a8a"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-59cf5bedd0bcfaf117f60a857526fdefd09ec89c526ff4b31b33566261746adacf231f1e410c1a3a9ce69bd1ea4c93db2653ee9653b16b5d544db6d073460a8a"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-59cf5bedd0bcfaf117f60a857526fdefd09ec89c526ff4b31b33566261746adacf231f1e410c1a3a9ce69bd1ea4c93db2653ee9653b16b5d544db6d073460a8a"' :
                                            'id="xs-pipes-links-module-SharedModule-59cf5bedd0bcfaf117f60a857526fdefd09ec89c526ff4b31b33566261746adacf231f1e410c1a3a9ce69bd1ea4c93db2653ee9653b16b5d544db6d073460a8a"' }>
                                            <li class="link">
                                                <a href="pipes/DateFormatPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DateFormatPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TasksModule-9da23d202005fb48665f377f51d5593339e0d1dca3c193530df503ddaa7a1bb0d811c4ba855918cbb12f35cd81353fbc72e947279637dddc65ffd5c4a9ff49ea"' : 'data-bs-target="#xs-injectables-links-module-TasksModule-9da23d202005fb48665f377f51d5593339e0d1dca3c193530df503ddaa7a1bb0d811c4ba855918cbb12f35cd81353fbc72e947279637dddc65ffd5c4a9ff49ea"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TasksModule-9da23d202005fb48665f377f51d5593339e0d1dca3c193530df503ddaa7a1bb0d811c4ba855918cbb12f35cd81353fbc72e947279637dddc65ffd5c4a9ff49ea"' :
                                        'id="xs-injectables-links-module-TasksModule-9da23d202005fb48665f377f51d5593339e0d1dca3c193530df503ddaa7a1bb0d811c4ba855918cbb12f35cd81353fbc72e947279637dddc65ffd5c4a9ff49ea"' }>
                                        <li class="link">
                                            <a href="injectables/TasksFacade.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksFacade</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksRoutingModule.html" data-type="entity-link" >TasksRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" >ConfirmDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoadingIndicatorComponent.html" data-type="entity-link" >LoadingIndicatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TaskEditDialog.html" data-type="entity-link" >TaskEditDialog</a>
                            </li>
                            <li class="link">
                                <a href="components/TaskFormComponent.html" data-type="entity-link" >TaskFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TaskItemComponent.html" data-type="entity-link" >TaskItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TaskListComponent.html" data-type="entity-link" >TaskListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserCreationDialog.html" data-type="entity-link" >UserCreationDialog</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthFacade.html" data-type="entity-link" >AuthFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateTaskUseCase.html" data-type="entity-link" >CreateTaskUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateUserUseCase.html" data-type="entity-link" >CreateUserUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeleteTaskUseCase.html" data-type="entity-link" >DeleteTaskUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorHandlerService.html" data-type="entity-link" >ErrorHandlerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindUserUseCase.html" data-type="entity-link" >FindUserUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetTasksUseCase.html" data-type="entity-link" >GetTasksUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpBaseService.html" data-type="entity-link" >HttpBaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link" >LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskApiService.html" data-type="entity-link" >TaskApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskMapper.html" data-type="entity-link" >TaskMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TaskRepositoryImpl.html" data-type="entity-link" >TaskRepositoryImpl</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TasksFacade.html" data-type="entity-link" >TasksFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateTaskUseCase.html" data-type="entity-link" >UpdateTaskUseCase</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserApiService.html" data-type="entity-link" >UserApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserMapper.html" data-type="entity-link" >UserMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserRepositoryImpl.html" data-type="entity-link" >UserRepositoryImpl</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ConfirmDialogData.html" data-type="entity-link" >ConfirmDialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskDto.html" data-type="entity-link" >TaskDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskEditDialogData.html" data-type="entity-link" >TaskEditDialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskEditDialogResult.html" data-type="entity-link" >TaskEditDialogResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TaskRepository.html" data-type="entity-link" >TaskRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCreationDialogData.html" data-type="entity-link" >UserCreationDialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRepository.html" data-type="entity-link" >UserRepository</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/DateFormatPipe.html" data-type="entity-link" >DateFormatPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});