% script_learn_temp.m
% 
% 


clear
close all

warning('off','MATLAB:textio:io:UnableToGuessFormat')
warning('off','MATLAB:datetime:AmbiguousDateString')
%#ok<*NANMEAN> 


%dataTable = table();

% loop through each file
% fileList= {
% 'taskdata_230727_121115_exp_learn_5fb28c1bf350e788b6412b0e.csv'
% 'taskdata_230727_134222_exp_learn_63e64f39956f8fe1af81883e.csv'
% 'taskdata_230802_235047_exp_learn_60fd310fff5b2600c9d95554.csv'
% };

temp = readtable('../start_data_exp_survey.csv');
surveyList = temp.filename;
surveyList(:,2) = temp.prolificID;
[~,b,c] = ymd(temp.date);
[d,e] = hms(temp.start_time);
% surveyList(:,3) = num2cell(b*1000000 + c*10000 + d*100 + e);
surveyList = sortrows(surveyList,2);

excludelist = {
'6018260b22d0500008f32d1f' % in case ew data included
'5c92f797803bff0017fef8dd' % returned
'62ea814597e4669c86d1eb46' % returned
'60fd274decb79fba37f2e72e' % returned
}

if ~isempty(excludelist)
    for x = 1:length(excludelist)
        if max(strcmp(surveyList(:,2),excludelist{x})==1)
            subjko = find(strcmp(surveyList(:,2),excludelist{x})==1);
            surveyList{subjko,1} = NaN;
            surveyList{subjko,2} = NaN;
            %surveyList{subjko,3} = NaN;
        end
    end
    surveyList(cellfun(@(x) any(isnan(x)),surveyList)) = [];
    surveyList = reshape(surveyList,length(surveyList)/2,2); % 3,3
end

% surveyList{end+1} = 'taskdata_230000_000000_exp_learn_611fe0f24abe3cc63f4fd424.csv'; % example of adding data



temp = readtable('../start_data_exp_fwdspan.csv');
fwdspanList = temp.filename;
clear temp

survey_phq = NaN(size(surveyList,1),2);
survey_gad = NaN(size(surveyList,1),2);
survey_stai = NaN(size(surveyList,1),2);
survey_sds = NaN(size(surveyList,1),2);
survey_aes = NaN(size(surveyList,1),2);
survey_masq = NaN(size(surveyList,1),2);
survey_sticsa = NaN(size(surveyList,1),2);
survey_pvss = NaN(size(surveyList,1),2);




fwd_perf = NaN(size(surveyList,1),6);




for i = 1:size(surveyList,1)
    
    excludelearn = 0;
    surveyTable = [];
    postTable = [];
    
    % read the learning csv file into a table
    surveyname = surveyList{i};
    if strcmp(surveyname(2),'t')
        surveyname = surveyname(2:end-1);
    end
    
    subjid = surveyname(35:end-4);
    subjtime = surveyname(10:22);
    survey_perf_name{i,1} = subjid;
    survey_perf_name{i,2} = subjtime;
    
    
    
    
    hassurvey = 0;
    for iT = 1:length(surveyList)
        temp = surveyList{iT};
        temp = temp(36:end-5);
        if (strcmp(temp,subjid))
            surveyname = surveyList{iT};
            surveyname = surveyname(2:end-1);
            if exist(['../exp_survey/' surveyname],'file')
                surveyTable = readtable(['../exp_survey/' surveyname]);
                if size(surveyTable,1)>19
                    hassurvey = 1;
                end
            end
        end
        clear temp
    end
    
    
    %survey_perf_name{i,4} = hastestday2;
    survey_perf_name{i,5} = hassurvey;
    
    
    
    
    hasfwd = 0;
    fwdname = ['../exp_fwdspan/taskdata_' subjtime '_exp_fwdspan_' subjid '.csv'];
    if exist(fwdname,'file')
        fwdTable = readtable(fwdname);
        hasfwd = 1;
    end
    
    
    
    %%%%%%%%%%%%%%%%
    %%%% survey %%%%
    %%%%%%%%%%%%%%%%
    if hassurvey %&& (excludelearn==0)
        
        % filter
        filt_phq = surveyTable(surveyTable.exp_stage == "PHQ9", :);
        filt_phq = filt_phq(2,:);
        filt_gad = surveyTable(surveyTable.exp_stage == "GAD7", :);
        filt_gad = filt_gad(2,:);
        filt_stai = surveyTable(surveyTable.exp_stage == "STAI", :);
        filt_stai = filt_stai(2,:);
        filt_sds = surveyTable(surveyTable.exp_stage == "SDS", :);
        filt_sds = filt_sds(2,:);
        filt_masq = surveyTable(surveyTable.exp_stage == "MASQ_7", :);
        filt_masq = filt_masq(2,:);
        filt_aes = surveyTable(surveyTable.exp_stage == "AES", :);
        filt_aes = filt_aes(2,:);
        filt_sticsa = surveyTable(surveyTable.exp_stage == "STICSA", :);
        filt_sticsa = filt_sticsa(2,:);
        filt_pvss = surveyTable(surveyTable.exp_stage == "PVSS", :);
        filt_pvss = filt_pvss(2,:);
        
        
        % PHQ
        % 9 items
        % catch
        resp_phq = cell2mat(filt_phq.response_string);
        subj_phq = survey_extract(resp_phq,'PHQ',9); % plus catch
        % using survey_extract function
        %subj_phq = [];
        %qindex = 1;
        %for iq = 1:size(resp_phq,2)-1
        %    if strcmp(':',resp_phq(iq))
        %        score_temp = resp_phq(iq+1);
        %        score_temp = str2double(score_temp);
        %        subj_phq(qindex,1) = score_temp;
        %        qindex = qindex+1;
        %        clear score_temp
        %    end
        %end
        survey_phq(i,1) = sum(subj_phq);
        
        % GAD
        % 7 items
        resp_gad = cell2mat(filt_gad.response_string);
        subj_gad = survey_extract(resp_gad,'GAD',7);
        survey_gad(i,1) = sum(subj_gad);
        

        % STAI
        % 18 items
        %// reverse-coded items:  1, 3, 6, 7, 10, 13, 14, 16, 19
        % catch
        % also has: BDI5, LOTR1, RRQ3
        % ADD to score: GAD item_1 + item_5 (average these scores), PHQ item_6
        %resp_stai = cell2mat(filt_stai.response_string);
        %subj_stai = survey_extract(resp_stai,'STAI',18); % plus catch
        %survey_stai(i,1) = sum(subj_stai);
        
        
        % SDS
        % 16 items
        %// reverse-coded items:  2, 5, 6, 11, 12, 14, 16, 17, 18, 20
        % catch
        % ADD to score: PHQ item_2, PHQ item_3, GAD item_5, GAD item_6, PHQ item_9
        %resp_sds = cell2mat(filt_sds.response_string);
        %subj_sds = survey_extract(resp_sds,'SDS',16); % plus catch
        %survey_sds(i,1) = sum(subj_sds);
        
        
        % MASQ
        % 8 items
        %// reverse-coded items:  1, 9, 15, 19, 23, 25
        % also has: hads2, hads6
        %resp_masq = cell2mat(filt_masq.response_string);
        %subj_masq = survey_extract(resp_masq,'masq',8);
        %survey_masq(i,1) = sum(subj_masq);
        
        
        % AES
        % 18 items
        %// reverse-coded items:  all except 6, 10, 11 (1, 2, 3, 4, 5, 7, 8, 9, 12, 13, 14, 15, 16, 17, 18)
        % catch
        % also has: FSS_9
        %resp_aes = cell2mat(filt_aes.response_string);
        %subj_aes = survey_extract(resp_aes,'AES',18); % plus catch
        %survey_aes(i,1) = sum(subj_aes);
        

        % STICSA
        % 10 items
        % catch
        % ADD to score: SDS item_9
        resp_sticsa = cell2mat(filt_sticsa.response_string);
        subj_sticsa = survey_extract(resp_sticsa,'STICSA',10); % plus catch
        survey_sticsa(i,1) = sum(subj_sticsa);
        

        % PVSS
        % 21 items
        % catch
        resp_pvss = cell2mat(filt_pvss.response_string);
        subj_pvss = survey_extract(resp_pvss,'PVSS',21); % plus catch
        survey_pvss(i,1) = sum(subj_pvss);
        
        
        
        
        
        % 
        
        % catch items
        % phq answer 0
        % stai answer 0
        % aes answer 0
        % sds answer 0
        % sticsa answer 3
        % pvss answer 8
        
        
        
        if excludelearn
            survey_phq(i,2) = survey_phq(i,1);
            survey_gad(i,2) = survey_gad(i,1);
        end
        
    elseif excludelearn
        
    end
    

    
    %%%%%%%%%%%%%%%%%%
    %%%% fwdspan %%%%
    %%%%%%%%%%%%%%%%%%
    if hasfwd %&& (excludelearn==0)
        
        fwd_perf(i,6) = 0;
        
        
        % filter
        filt_fwd = fwdTable(fwdTable.exp_name == "fwdspan", :);
        
        % 
        fwd_perf(i,1) = i;
        fwd_perf(i,2) = max(filt_fwd.span.*filt_fwd.correct_full);
        
        if excludelearn
            fwd_perf(i,5) = fwd_perf(i,2);
            fwd_perf(i,2) = NaN;
        end

    elseif excludelearn
        fwd_perf(i,6) = 1;
    end
    

    
    %%%%%%%%%%%%%%%%
    %%%%% post %%%%%
    %%%%%%%%%%%%%%%%
    if 1==2 %&& (excludelearn==0)
        
        filt_post = postTable((postTable.exp_stage == "survey"), :);
        
        
        
        
        post_perf(i,1) = i;
        post_perf(i,2) = str2double(postTable.response{1});
        
        
        a5 = filt_post.response{5};
        a5 = a5(8:22);
        if strcmp(a5,'Definitely noti')
            post_perf(i,6) = 4;
        elseif strcmp(a5,'Sometimes notic')
            post_perf(i,6) = 3;
        elseif strcmp(a5,'Did not notice ')
            post_perf(i,6) = 2;
        elseif strcmp(a5,'Definitely no p')
            post_perf(i,6) = 1;
        end
        
        
        a6 = filt_post.response{6};
        if length(a6)>22
            a6 = a6(8:end-5);
        else
            a6 = a6(8:19);
        end
        %post_response{i,2} = a6;
        
        if strcmp(a6,'Learned much better with with longer de') || strcmp(a6,'Learned much better with longer de')
            post_perf(i,7) = 4;
        elseif strcmp(a6,'Longer delay')
            post_perf(i,7) = 3;
        elseif strcmp(a6,'Shorter dela')
            post_perf(i,7) = 2;
        elseif strcmp(a6,'Learned much better with with shorter de') || strcmp(a6,'Learned much better with shorter de')
            post_perf(i,7) = 1;
        end
        
        
        post_perf(i,8) = str2num(postTable.response{7});
        post_perf(i,9) = str2num(postTable.response{8});
        
        
        post_perf(i,10) = str2num(filt_post.response{10});
        
        post_response{i,1} = i;
        a9 = filt_post.response{9};
        a9 = a9(9:end-2);
        a12 = filt_post.response{12};
        a12 = a12(9:end-2);
        a13 = filt_post.response{13};
        a13 = a13(9:end-2);
        post_response{i,2} = a9;
        post_response{i,3} = a12;
        post_response{i,4} = a13;
        
    else
        post_response{i,1} = NaN;
    end
    
    
end


survey_phqx = survey_phq;
survey_phqx(survey_phqx==0) = NaN;
survey_gadx = survey_gad;
survey_gadx(survey_gadx==0) = NaN;
survey_comb = survey_phq(:,1)+survey_gad(:,1);
survey_combx = survey_comb;
survey_combx(survey_combx==0) = NaN;


figure,histogram(survey_phq(:,1))

figure,histogram(survey_phq(:,1),'Normalization','percentage')


nsurvey = nansum(survey_phq(:,1)>-1)

% delay frustration and learning for long delay, r = -0.156, p = 0.193
% no correlation with test phase though
% [r, p ] = corr(learn_extract(:,3),post_perf(:,3),'rows','complete')


% scatter(test_rate(:,5),test_day2_rate(:,5))


if 1==2
    
    histogram(survey_phq(:,1))
    ylim([0,20])
    xlim([-1.5,23.5])

    [r,p] = corr(survey_phqx(:,1),learn_repdel_perf(:,7),'rows','complete')

    [r,p] = corr(survey_gadx(:,1),learn_rep(:,7),'rows','complete')
end

% study1
% mean n = 11 with 'very frustrated' 
%  0.6724    0.6193    0.7258  (10.65% diff)
% mean n = 58 other
%  0.7857    0.7673    0.8040  (3.67% diff)

% study1
% some weak correlation between mood rating frustration and poor performance
if 1==2
    [r, p ] = corr(learn_extract(:,1),post_perf(:,4),'rows','complete')
    % r = -0.242, p = 0.042
    % 
    learnexl = (learn_all_perf(learn_perf(:,14)==1,:));
    learnx = nanmean(learnexl(:,16:18)')';
    learnx(:,2) = nanmean(learnexl(:,15:18)')';
    learnx(:,3) = nanmean(learnexl(:,14:18)')';
    learnx(:,4) = nanmean(learnexl(:,13:18)')';
    plot(learn_all_perf')


    plot(learn_all_perf(learn_perf(:,14)==1,:)')
end


% study1
% correlation between self-rated engagement and performance
if 1==2
    [r, p ] = corr(learn_extract(:,1),post_perf(:,6),'rows','complete')
    % r=0.33, p=0.005
    [r, p ] = corr(test_extract(:,1),post_perf(:,6),'rows','complete')
end





%%%%%%%%%%%
if 1==2
    
    load temp_corr
    survey_comb = survey(:,1)+survey(:,2)+survey(:,9)+survey(:,10)+survey(:,11);
    
    for i = 1:16
        [rs_anx(1,i),ps_anx(1,i)] = corr(survey(:,2),task_slide(:,i));
    end
    for i = 1:16
        [rs_depr(1,i),ps_depr(1,i)] = corr(survey(:,1),task_slide(:,i));
    end
    
    for i = 1:16
        [rs_comb(1,i),ps_comb(1,i)] = corr(survey(:,3),task_slide(:,i));
    end
    
    plot(nanmean(task_slide(survey(:,2)<median(survey(:,2)))))
    hold on; plot(nanmean(task_slide(survey(:,2)<median(survey(:,2)),:)))
    
    plot(nanmean(task_slide(survey(:,1)<median(survey(:,1)),:)))
    hold on; plot(nanmean(task_slide(survey(:,1)>median(survey(:,1)),:)))
    
    
    
    for i = 1:18
        [rd_depr(1,i),pd_depr(1,i)] = corr(survey_phqx(:,1),learn_repdel_perf(:,i),'rows','complete');
    end
    for i = 1:18
        [ri_depr(1,i),pi_depr(1,i)] = corr(survey_phqx(:,1),learn_repimm_perf(:,i),'rows','complete');
    end
    
    
    for i = 1:18
        [rd_anx(1,i),pd_anx(1,i)] = corr(survey_gadx(:,1),learn_repdel_perf(:,i),'rows','complete');
    end
    for i = 1:18
        [ri_anx(1,i),pi_anx(1,i)] = corr(survey_gadx(:,1),learn_repimm_perf(:,i),'rows','complete');
    end
    
    
    for i = 1:18
        [rd_comb(1,i),pd_comb(1,i)] = corr(survey_combx(:,1),learn_repdel_perf(:,i),'rows','complete');
    end
    for i = 1:18
        [ri_comb(1,i),pi_comb(1,i)] = corr(survey_combx(:,1),learn_repimm_perf(:,i),'rows','complete');
    end
    
    
    
    for i = 1:18
        [rs_sds(1,i),ps_sds(1,i)] = corr(survey(:,3),task_rep(:,i));
    end
    for i = 1:18
        [rs_stai(1,i),ps_stai(1,i)] = corr(survey(:,4),task_rep(:,i));
    end
    for i = 1:18
        [rs_aes(1,i),ps_aes(1,i)] = corr(survey(:,5),task_rep(:,i));
    end
    for i = 1:18
        [rs_masq(1,i),ps_masq(1,i)] = corr(survey(:,6),task_rep(:,i));
    end
    for i = 1:18
        [rs_sticsa(1,i),ps_sticsa(1,i)] = corr(survey(:,7),task_rep(:,i));
    end
    
    for i = 1:18
        [rs_comb(1,i),ps_comb(1,i)] = corr(survey_comb(:,1),task_rep(:,i));
    end
    
    
    [r,p] = corr(survey(:,3),task_rep(:,7))
    
    [r,p] = corr(sum(survey(:,[1,2,3,4,5,6,7])')',task_rep(:,7))
    

    % anx and depr per repetition
    for i = 1:18
        [rs_all(1,i),ps_all(1,i)] = corr(sum(survey(:,[1,2,3,4,5,6,7])')',task_rep(:,i));
    end
    
    for i = 1:18
        [rs_anxdepr(1,i),ps_anxdepr(1,i)] = corr(survey(:,1)+survey(:,2),task_rep(:,i));
    end
    
    for i = 1:18
        [rs_del_anxdepr(1,i),ps_del_anxdepr(1,i)] = corr(survey(:,1)+survey(:,2),task_repdel(:,i));
    end
    for i = 1:18
        [rs_imm_anxdepr(1,i),ps_imm_anxdepr(1,i)] = corr(survey(:,1)+survey(:,2),task_repimm(:,i));
    end
    plot(rs_anxdepr)
    hold on
    plot(rs_del_anxdepr)
    plot(rs_imm_anxdepr)
    
    % across task measure
    task_del = mean(task_repdel,2);
    task_imm = mean(task_repimm,2);
    [r, p] = corr(survey(:,1)+survey(:,2),task_del)
    [r, p] = corr(survey(:,1)+survey(:,2),task_imm)

    % post-questionnaire
    
    % concern about delay frustration driving mood/anx relationship
    % doesn't appear the case, but need to do regression
    % (and need vas for more graded responses)
    % 
    [r,p] = corr(task_repdel(:,7),post_delfrust)
    % 
    [r,p] = corr(survey(:,2),post_delfrust)
    scatter(survey(:,1),post_delfrust)
    % r's of ~0.18, p's ~0.17
    % highest for AES, p=0.06
    
    % anx/depr more frustrated by the mood ratings
    [r,p] = corr(survey(:,2),post_moodfrust)
    % r=0.267, p=0.031 for anx; similar for depr
    
    % no link between 'notice delay' and anx/depr
    % no link between 'delay better performance' and anx/depr
    
    % negative between engagement vas and anx/depr, r's -0.18 to -0.20
    [r,p] = corr(survey(:,1),post_engagement)
    
    % negative correlation with del perf and engagement in particular
    [r,p] = corr(task_repdel(:,7),post_engagement)
    [r,p] = corr(task_repimm(:,7),post_engagement)
    

    % regression controlling for delay frustration
    [b,dev,stats] = glmfit([survey(:,2) post_delfrust],task_rep(:,7));
    stats.p
    
    
    
end



function subj_out = survey_extract(resp_in,sname,nitems)
    qindex = 1;
    subj_out = [];
    for iq = 1:size(resp_in,2)-1
        if strcmp(':',resp_in(iq))
            % 'Catch":0'
            if ~strcmp('ch',resp_in(iq-3:iq-2)) && (qindex<=nitems)
                score_temp = resp_in(iq+1);
                score_temp = str2double(score_temp);
                subj_out(qindex,1) = score_temp;
                qindex = qindex+1;
            end
        end
    end
end
